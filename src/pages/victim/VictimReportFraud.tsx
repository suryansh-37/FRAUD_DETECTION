import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  FileText,
  Sparkles,
  ShieldCheck,
  CircleCheck,
  CircleAlert,
  ArrowRight,
  Upload,
  Info,
  ChevronLeft,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { PortalShell } from '../../components/layout/PortalShell';

export function VictimReportFraud() {
  const { currentUser } = useAuth();
  const { addComplaint } = useStore();
  const [, setLocation] = useLocation();

  // Form states
  const [complainantName, setComplainantName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone || '+91 98230 45812');
  const [email, setEmail] = useState(currentUser.email);
  const [locationName, setLocationName] = useState('Pune, Maharashtra');

  const [incidentDate, setIncidentDate] = useState('2026-03-08 16:45');
  const [scamType, setScamType] = useState('Telegram Task / Crypto Investment Scam');
  const [lossAmountINR, setLossAmountINR] = useState('320000');
  const [cryptoType, setCryptoType] = useState('USDT (TRC-20)');
  const [cryptoAmount, setCryptoAmount] = useState('3,800 USDT');

  const [walletAddress, setWalletAddress] = useState('0x71c6bf5e51082531a293f0b2f5670845a93f110a');
  const [txHash, setTxHash] = useState('0x9a84b0e5124976cf7493c834017f8a3d3c8c1d56e7f80459c72e21b19324c5bb');
  const [exchangeUsed, setExchangeUsed] = useState('CoinDCX');
  const [description, setDescription] = useState(
    'Contacted on Telegram offering high returns for rating travel apps. Later coerced to buy crypto via CoinDCX and transfer it to an alleged institutional liquidity wallet.'
  );

  const [submittedComplaintId, setSubmittedComplaintId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1-Click Sample Preloader
  const loadSample = (preset: 'telegram' | 'parcel' | 'fakeDex') => {
    if (preset === 'telegram') {
      setScamType('Telegram Task / Crypto Investment Scam');
      setLossAmountINR('345000');
      setCryptoType('USDT (TRC-20)');
      setCryptoAmount('4,100 USDT');
      setWalletAddress('0x71c6bf5e51082531a293f0b2f5670845a93f110a');
      setTxHash('0x9a84b0e5124976cf7493c834017f8a3d3c8c1d56e7f80459c72e21b19324c5bb');
      setExchangeUsed('CoinDCX');
      setDescription('Joined Telegram group promising 30% daily returns on crypto trading. Made 3 transactions before account withdrawals were frozen demanding extra tax.');
    } else if (preset === 'parcel') {
      setScamType('Courier Parcel Extortion / Digital Arrest');
      setLossAmountINR('180000');
      setCryptoType('BTC');
      setCryptoAmount('0.024 BTC');
      setWalletAddress('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
      setTxHash('0x4bd817ce8291410f92410a829375104273891402');
      setExchangeUsed('WazirX');
      setDescription('Fraudsters claimed a parcel with passports was seized by customs in Mumbai. Coerced into buying Bitcoin on WazirX and sending to a verification escrow address.');
    } else {
      setScamType('Fake DEX / Phishing Web3 DApp');
      setLossAmountINR('520000');
      setCryptoType('ETH');
      setCryptoAmount('1.85 ETH');
      setWalletAddress('0xa1289c02e5b741042b89012a99e04819231a48c1');
      setTxHash('0x88f1c01b2a945104192831a47819231908471029348710293847102938471029');
      setExchangeUsed('Metamask / Uniswap');
      setDescription('Connected hardware wallet to a fake staking website mimicking a legitimate protocol. Unlimited allowance permit drained all wallet balances.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complainantName.trim()) {
      setError('Please provide your full legal name.');
      return;
    }
    if (!lossAmountINR || Number(lossAmountINR) <= 0) {
      setError('Please enter a valid loss amount.');
      return;
    }
    if (!walletAddress.trim()) {
      setError('Please provide the suspect wallet address.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const created = addComplaint({
        complainantName,
        phone,
        email,
        location: locationName,
        incidentDate,
        scamType,
        lossAmountINR: Number(lossAmountINR),
        cryptoType,
        cryptoAmount,
        walletAddress,
        txHash,
        exchangeUsed,
        description,
      });

      setIsSubmitting(false);
      setSubmittedComplaintId(created.id);
    }, 600);
  };

  if (submittedComplaintId) {
    return (
      <PortalShell title="Complaint Lodged">
        <div className="panel" style={{ maxWidth: 680, margin: '20px auto', padding: 36, textAlign: 'center' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'hsl(157 24% 38%/.15)',
              color: 'hsl(157 24% 34%)',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 18px',
            }}
          >
            <CircleCheck size={32} />
          </div>

          <div className="eyebrow">National Cybercrime Coordination Centre (I4C)</div>
          <h1 className="title-serif" style={{ fontSize: 32, margin: '8px 0' }}>
            Complaint Successfully Lodged
          </h1>
          <p className="subtle" style={{ fontSize: 13, maxWidth: 500, margin: '0 auto 24px' }}>
            Your complaint has been timestamped and transmitted to the Cyber Crime Investigation Cell. Forensic blockchain tracing has been queued.
          </p>

          <div
            className="panel"
            style={{
              background: 'hsl(var(--background))',
              padding: 20,
              borderRadius: 10,
              textAlign: 'left',
              marginBottom: 26,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid hsl(var(--border))', paddingBottom: 10 }}>
              <span className="subtle" style={{ fontSize: 12 }}>Acknowledgement Number</span>
              <strong className="mono" style={{ fontSize: 14, color: 'hsl(var(--accent))' }}>
                {submittedComplaintId}
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid hsl(var(--border))', padding: '10px 0' }}>
              <span className="subtle" style={{ fontSize: 12 }}>Complainant</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{complainantName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid hsl(var(--border))', padding: '10px 0' }}>
              <span className="subtle" style={{ fontSize: 12 }}>Reported Loss</span>
              <span style={{ fontSize: 12, fontWeight: 700 }}>₹{Number(lossAmountINR).toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid hsl(var(--border))', padding: '10px 0' }}>
              <span className="subtle" style={{ fontSize: 12 }}>Suspect Address</span>
              <span className="mono" style={{ fontSize: 11 }}>{walletAddress.slice(0, 10)}…{walletAddress.slice(-8)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10 }}>
              <span className="subtle" style={{ fontSize: 12 }}>Initial Stage</span>
              <span className="badge badge-medium">1 / 5 · Received & Queued</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/victim/track?ref=${submittedComplaintId}`}
              className="btn btn-primary"
              style={{ padding: '11px 24px' }}
            >
              Track Investigation Status <ArrowRight size={14} />
            </Link>
            <Link href="/victim" className="btn btn-ghost">
              Back to Citizen Portal
            </Link>
          </div>
        </div>
      </PortalShell>
    );
  }

  return (
    <PortalShell title="Report Crypto Fraud">
      <Link href="/victim" className="btn btn-ghost" style={{ marginBottom: 18 }}>
        <ChevronLeft size={14} /> Back to Citizen Portal
      </Link>

      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="eyebrow">Form CF-01 · Cyber Crime Reporting</div>
          <h1 className="page-title">File Digital Asset Fraud Complaint.</h1>
          <p className="subtle" style={{ fontSize: 13, marginTop: 8 }}>
            Provide all available transaction and wallet details. Information will be shared directly with authorized Law Enforcement Agencies (LEA) and FIU-IND registered crypto exchanges.
          </p>
        </div>

        {/* Quick Demo Preloaders */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="eyebrow" style={{ marginRight: 4 }}>
            <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
            Demo Fill:
          </span>
          <button type="button" onClick={() => loadSample('telegram')} className="btn btn-secondary" style={{ fontSize: 11, padding: '5px 9px' }}>
            Telegram Task Scam
          </button>
          <button type="button" onClick={() => loadSample('parcel')} className="btn btn-secondary" style={{ fontSize: 11, padding: '5px 9px' }}>
            Digital Arrest / Parcel
          </button>
          <button type="button" onClick={() => loadSample('fakeDex')} className="btn btn-secondary" style={{ fontSize: 11, padding: '5px 9px' }}>
            Fake Staking DApp
          </button>
        </div>
      </div>

      {error && (
        <div
          className="notice-box"
          style={{
            background: 'hsl(3 44% 44%/.1)',
            borderColor: 'hsl(var(--destructive))',
            color: 'hsl(var(--destructive))',
            marginBottom: 20,
          }}
        >
          <CircleAlert size={18} />
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Section 1: Complainant Details */}
        <div className="panel" style={{ padding: 22, marginBottom: 16 }}>
          <div className="section-head">
            <div className="section-title">1. Complainant Information</div>
            <span className="badge badge-neutral">Identity Verified</span>
          </div>
          <div className="two-col" style={{ gap: 14 }}>
            <div>
              <label className="eyebrow" htmlFor="c-name">Full Legal Name</label>
              <input
                id="c-name"
                className="input"
                style={{ marginTop: 6 }}
                value={complainantName}
                onChange={(e) => setComplainantName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="eyebrow" htmlFor="c-phone">Phone (Registered on 1930 / WhatsApp)</label>
              <input
                id="c-phone"
                className="input"
                style={{ marginTop: 6 }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="eyebrow" htmlFor="c-email">Email Address</label>
              <input
                id="c-email"
                type="email"
                className="input"
                style={{ marginTop: 6 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="eyebrow" htmlFor="c-loc">City & State of Residence</label>
              <input
                id="c-loc"
                className="input"
                style={{ marginTop: 6 }}
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Incident & Financial Loss */}
        <div className="panel" style={{ padding: 22, marginBottom: 16 }}>
          <div className="section-head">
            <div className="section-title">2. Fraud Typology & Loss Value</div>
            <span className="badge badge-neutral">Financial Triage</span>
          </div>
          <div className="two-col" style={{ gap: 14 }}>
            <div>
              <label className="eyebrow" htmlFor="c-scam">Scam Typology / Modus Operandi</label>
              <select
                id="c-scam"
                className="select"
                style={{ marginTop: 6 }}
                value={scamType}
                onChange={(e) => setScamType(e.target.value)}
              >
                <option>Telegram Task / Crypto Investment Scam</option>
                <option>Courier Parcel Extortion / Digital Arrest</option>
                <option>Fake DEX / Phishing Web3 DApp</option>
                <option>Romance Scam / Pig-Butchering</option>
                <option>P2P Bank Account Freeze Trap</option>
                <option>Impersonation of Police / CBI / ED</option>
                <option>Other Crypto Asset Fraud</option>
              </select>
            </div>
            <div>
              <label className="eyebrow" htmlFor="c-date">Date & Time of Incident</label>
              <input
                id="c-date"
                type="text"
                className="input"
                style={{ marginTop: 6 }}
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
              />
            </div>
            <div>
              <label className="eyebrow" htmlFor="c-loss">Estimated Loss (in Indian Rupees ₹)</label>
              <input
                id="c-loss"
                type="number"
                className="input"
                style={{ marginTop: 6 }}
                value={lossAmountINR}
                onChange={(e) => setLossAmountINR(e.target.value)}
                placeholder="e.g. 250000"
                required
              />
            </div>
            <div>
              <label className="eyebrow" htmlFor="c-crypto">Crypto Asset Involved & Quantity</label>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <select
                  id="c-crypto"
                  className="select"
                  style={{ flex: '0 0 160px' }}
                  value={cryptoType}
                  onChange={(e) => setCryptoType(e.target.value)}
                >
                  <option>USDT (TRC-20)</option>
                  <option>USDT (Polygon)</option>
                  <option>BTC (Bitcoin)</option>
                  <option>ETH (Ethereum)</option>
                  <option>USDC (ERC-20)</option>
                  <option>SOL (Solana)</option>
                  <option>BNB (BSC)</option>
                </select>
                <input
                  className="input"
                  value={cryptoAmount}
                  onChange={(e) => setCryptoAmount(e.target.value)}
                  placeholder="e.g. 3,500 USDT"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Blockchain & Suspect Details */}
        <div className="panel" style={{ padding: 22, marginBottom: 16 }}>
          <div className="section-head">
            <div className="section-title">3. Blockchain & Suspect Evidence</div>
            <span className="badge badge-high">Critical for Requisition</span>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="eyebrow" htmlFor="c-wallet">
              Suspect / Beneficiary Crypto Wallet Address *
            </label>
            <input
              id="c-wallet"
              className="input mono"
              style={{ marginTop: 6 }}
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x… or Bitcoin / Tron address where tokens were transferred"
              required
            />
            <div className="subtle" style={{ fontSize: 11, marginTop: 4 }}>
              This address will be immediately checked against FIU-IND registered exchange deposit clusters.
            </div>
          </div>

          <div className="two-col" style={{ gap: 14 }}>
            <div>
              <label className="eyebrow" htmlFor="c-tx">Transaction Hash / TxID (if known)</label>
              <input
                id="c-tx"
                className="input mono"
                style={{ marginTop: 6 }}
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="0x… blockchain transaction identifier"
              />
            </div>
            <div>
              <label className="eyebrow" htmlFor="c-exchange">Exchange / Platform Used by You</label>
              <select
                id="c-exchange"
                className="select"
                style={{ marginTop: 6 }}
                value={exchangeUsed}
                onChange={(e) => setExchangeUsed(e.target.value)}
              >
                <option>CoinDCX</option>
                <option>WazirX</option>
                <option>Binance</option>
                <option>SunCrypto</option>
                <option>CoinSwitch</option>
                <option>ZebPay</option>
                <option>Self-Custody Wallet (Trust / Metamask)</option>
                <option>P2P Telegram / WhatsApp Trader</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Narrative & Declaration */}
        <div className="panel" style={{ padding: 22, marginBottom: 20 }}>
          <div className="section-head">
            <div className="section-title">4. Incident Narrative & Evidence Upload</div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="eyebrow" htmlFor="c-desc">Detailed Description of Incident</label>
            <textarea
              id="c-desc"
              className="input"
              rows={4}
              style={{ marginTop: 6, resize: 'vertical' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain how you were contacted, instructions given, promises made, and why you suspect fraud..."
            />
          </div>

          <div
            style={{
              border: '2px dashed hsl(var(--border))',
              borderRadius: 10,
              padding: 20,
              textAlign: 'center',
              background: 'hsl(var(--background)/.4)',
              cursor: 'pointer',
            }}
          >
            <Upload size={24} style={{ margin: '0 auto 8px', color: 'hsl(var(--muted-foreground))' }} />
            <div style={{ fontSize: 12, fontWeight: 600 }}>
              Attach Supporting Screenshots (Chats, Payment Slips, Tx Receipts)
            </div>
            <div className="subtle" style={{ fontSize: 11, marginTop: 4 }}>
              PDF, JPG, PNG up to 25MB · Stored securely in tamper-evident vault
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 18,
              padding: '12px 14px',
              borderRadius: 8,
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
            }}
          >
            <ShieldCheck size={18} color="hsl(var(--accent))" style={{ flex: '0 0 auto' }} />
            <div style={{ fontSize: 11, lineHeight: 1.45 }}>
              I hereby declare that the facts stated above are true to the best of my knowledge. I authorize Law Enforcement Officers to requisition transaction history and initiate freezing under Section 91 CrPC.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <Link href="/victim" className="btn btn-ghost">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '11px 26px' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Transmitting to Cyber Cell...' : 'Submit Fraud Complaint'} <ArrowRight size={14} />
          </button>
        </div>
      </form>
    </PortalShell>
  );
}
