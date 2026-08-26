'use client';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Shield, Lock, AlertTriangle, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReceiveScreen() {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [walletAddress, setWalletAddress] = useState('');
  const [copied, setCopied] = useState(false);

  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin (Native SegWit)', address: 'bc1qy2az8mngswccjw64n6gnht328pd0msh2pemwx5' },
    { symbol: 'XLM', name: 'Stellar (Native XLM)', address: 'GBPZ6DFELDCWXDHRKBRI2W47J3CIGTZDIKG3CZPRFV6FJXKZG3SUXGZV' },
    { symbol: 'XRP', name: 'Ripple (XRPL Native)', address: 'rPMEXPR4BNqL9sMxqHUJGdtfxugFmHFvgu' },
    { symbol: 'USDT-TRC20', name: 'Tether (Tron TRC20)', address: 'TNXcWBxYppBmqwimZFJuh74sLZfNePhw9D' },
    { symbol: 'USDT-EVM', name: 'Tether (Ethereum / BNB)', address: '0x29C90189201bB1f07b66bafdCB389873313A58aa' },
    { symbol: 'SOL', name: 'Solana (Native SPL)', address: 'HzJ4gEGSmeeehzkLvMh4xGp2jancrHfnRW8pE8M44hKe' },
  ];

  useEffect(() => {
    const crypto = cryptoOptions.find(c => c.symbol === selectedCrypto) || cryptoOptions[0];
    setWalletAddress(crypto.address);
  }, [selectedCrypto]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      toast.success('Address copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      {/* Receive Card */}
      <div className="glass-panel p-8 rounded-3xl border-slate-800 shadow-2xl relative">
        
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Deposit / Inbound Settlement</h2>
            <p className="text-xs text-slate-400">Receive sovereign funds to your dedicated ledger vault</p>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Shield size={12} /> Air-Gapped Key
          </span>
        </div>
        
        {/* Currency selection pills */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            Select Settlement Asset & Network
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {cryptoOptions.map((crypto) => (
              <button
                key={crypto.symbol}
                type="button"
                onClick={() => setSelectedCrypto(crypto.symbol)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedCrypto === crypto.symbol
                    ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300 shadow-sm shadow-cyan-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="text-xs font-bold">{crypto.symbol}</div>
                <div className="text-[10px] text-slate-400 truncate">{crypto.name.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* QR Code Container */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-6 text-center">
          <div className="inline-block p-4 bg-white rounded-2xl shadow-xl mb-4">
            <QRCodeSVG
              value={walletAddress}
              size={180}
              level="H"
              includeMargin={false}
              renderAs="svg"
              bgColor="#ffffff"
              fgColor="#030712"
            />
          </div>

          <div className="text-xs text-slate-400 font-mono flex items-center justify-center gap-1.5 mb-4">
            <QrCode size={14} className="text-cyan-400" />
            <span>Scan via cold wallet or mobile terminal</span>
          </div>
          
          {/* Address Bar */}
          <div className="relative">
            <input
              type="text"
              value={walletAddress}
              readOnly
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-xs pr-12 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          <span>
            Only dispatch <strong className="text-white">{selectedCrypto}</strong> to this address. Cross-network asset mismatch will result in irreversible cryptographic loss.
          </span>
        </div>

      </div>
    </div>
  );
}
