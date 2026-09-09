import type { LiveInspection } from '../types';

export const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export async function inspectWallet(address: string, network: string): Promise<LiveInspection> {
  const response = await fetch(
    `${basePath}/api/blockchain/inspect?address=${encodeURIComponent(address)}&network=${encodeURIComponent(network)}`
  );
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Live blockchain data is unavailable right now.');
  return payload as LiveInspection;
}
