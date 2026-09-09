import { Router, type IRouter } from "express";

type NormalizedTransaction = {
  hash: string;
  timestamp: string | null;
  direction: "in" | "out" | "mixed";
  value: string;
  counterparty: string;
  status: string;
  chain: string;
  explorerUrl: string;
};

const router: IRouter = Router();

const ethereumAddress = /^0x[a-fA-F0-9]{40}$/;
const bitcoinAddress = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{20,90}$/;

function providerFor(network: string, address: string) {
  if (bitcoinAddress.test(address)) {
    return {
      network: "Bitcoin",
      symbol: "BTC",
      decimals: 8,
      endpoint: `https://blockstream.info/api/address/${encodeURIComponent(address)}/txs`,
      summaryEndpoint: `https://blockstream.info/api/address/${encodeURIComponent(address)}`,
      explorerBase: "https://blockstream.info",
    };
  }

  const isPolygon = network.toLowerCase() === "polygon";
  return {
    network: isPolygon ? "Polygon" : "Ethereum",
    symbol: isPolygon ? "POL" : "ETH",
    decimals: 18,
    endpoint: `https://${isPolygon ? "polygon" : "eth"}.blockscout.com/api/v2/addresses/${encodeURIComponent(address)}/transactions`,
    summaryEndpoint: `https://${isPolygon ? "polygon" : "eth"}.blockscout.com/api/v2/addresses/${encodeURIComponent(address)}`,
    explorerBase: `https://${isPolygon ? "polygon" : "eth"}.blockscout.com`,
  };
}

function formatUnits(value: string | number | bigint, decimals: number, symbol: string) {
  try {
    const raw = BigInt(value);
    const base = 10n ** BigInt(decimals);
    const whole = raw / base;
    const remainder = raw % base;
    const fraction = remainder.toString().padStart(decimals, "0").slice(0, 6).replace(/0+$/, "");
    return `${whole.toString()}${fraction ? `.${fraction}` : ""} ${symbol}`;
  } catch {
    return `0 ${symbol}`;
  }
}

function isoTimestamp(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

async function fetchJson(url: string) {
  const response = await fetch(url, { signal: AbortSignal.timeout(12000), headers: { accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`Provider returned ${response.status} for ${url}`);
  }
  return response.json();
}

function normalizeBitcoinTransaction(tx: any, address: string, provider: ReturnType<typeof providerFor>): NormalizedTransaction {
  const received = (tx.vout ?? []).filter((output: any) => output.scriptpubkey_address === address).reduce((sum: bigint, output: any) => sum + BigInt(output.value ?? 0), 0n);
  const spent = (tx.vin ?? []).filter((input: any) => input.prevout?.scriptpubkey_address === address).reduce((sum: bigint, input: any) => sum + BigInt(input.prevout?.value ?? 0), 0n);
  const direction = received > spent ? "in" : spent > received ? "out" : "mixed";
  const counterparty = direction === "in" ? (tx.vin?.[0]?.prevout?.scriptpubkey_address ?? "Unknown sender") : (tx.vout?.[0]?.scriptpubkey_address ?? "Unknown recipient");
  return {
    hash: tx.txid,
    timestamp: tx.status?.block_time ? new Date(tx.status.block_time * 1000).toISOString() : null,
    direction,
    value: formatUnits(received > spent ? received - spent : spent - received, provider.decimals, provider.symbol),
    counterparty,
    status: tx.status?.confirmed ? "Confirmed" : "Pending",
    chain: provider.network,
    explorerUrl: `${provider.explorerBase}/tx/${tx.txid}`,
  };
}

function normalizeEvmTransaction(tx: any, address: string, provider: ReturnType<typeof providerFor>): NormalizedTransaction {
  const from = tx.from?.hash ?? tx.from?.address ?? "";
  const to = tx.to?.hash ?? tx.to?.address ?? "";
  const isFrom = from.toLowerCase() === address.toLowerCase();
  const isTo = to.toLowerCase() === address.toLowerCase();
  const direction = isFrom && isTo ? "mixed" : isTo ? "in" : "out";
  return {
    hash: tx.hash,
    timestamp: isoTimestamp(tx.timestamp),
    direction,
    value: formatUnits(tx.value ?? "0", provider.decimals, provider.symbol),
    counterparty: direction === "in" ? from || "Contract / unknown" : to || "Contract / unknown",
    status: tx.status === "error" ? "Failed" : "Confirmed",
    chain: provider.network,
    explorerUrl: `${provider.explorerBase}/tx/${tx.hash}`,
  };
}

router.get("/blockchain/inspect", async (req, res) => {
  const address = String(req.query.address ?? "").trim();
  const requestedNetwork = String(req.query.network ?? "Auto-detect").trim();

  if ((!ethereumAddress.test(address) && !bitcoinAddress.test(address)) || (requestedNetwork === "Bitcoin" && !bitcoinAddress.test(address))) {
    return res.status(400).json({ error: "Enter a complete Ethereum or Bitcoin address." });
  }

  try {
    const provider = providerFor(requestedNetwork, address);
    const [transactionsPayload, summaryPayload] = await Promise.all([
      fetchJson(provider.endpoint),
      fetchJson(provider.summaryEndpoint),
    ]);

    const rawTransactions = provider.network === "Bitcoin"
      ? Array.isArray(transactionsPayload) ? transactionsPayload : []
      : Array.isArray(transactionsPayload?.items) ? transactionsPayload.items : [];
    const transactions = rawTransactions.slice(0, 25).map((tx: any) => provider.network === "Bitcoin"
      ? normalizeBitcoinTransaction(tx, address, provider)
      : normalizeEvmTransaction(tx, address, provider));
    const incoming = transactions.filter((tx) => tx.direction === "in").length;
    const outgoing = transactions.filter((tx) => tx.direction === "out").length;
    const timestamps = transactions.map((tx) => tx.timestamp).filter(Boolean) as string[];

    const balance = provider.network === "Bitcoin"
      ? formatUnits(summaryPayload?.chain_stats?.funded_txo_sum - summaryPayload?.chain_stats?.spent_txo_sum, provider.decimals, provider.symbol)
      : formatUnits(summaryPayload?.coin_balance ?? "0", provider.decimals, provider.symbol);

    return res.json({
      address,
      network: provider.network,
      provider: provider.network === "Bitcoin" ? "Blockstream Esplora" : `Blockscout ${provider.network}`,
      explorerUrl: `${provider.explorerBase}/address/${address}`,
      validated: true,
      balance,
      transactionCount: provider.network === "Bitcoin"
        ? (summaryPayload?.chain_stats?.tx_count ?? transactions.length)
        : (summaryPayload?.transactions_count ?? transactions.length),
      summary: {
        incoming,
        outgoing,
        firstSeen: timestamps.at(-1) ?? null,
        lastSeen: timestamps.at(0) ?? null,
      },
      transactions,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Blockchain provider unavailable";
    return res.status(502).json({ error: "Live blockchain data is unavailable right now.", detail: message });
  }
});

export default router;