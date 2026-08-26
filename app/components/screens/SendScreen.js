'use client';
import { ArrowRightCircle, Search, Shield, Zap, Lock, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SendScreen({ balance, onSuccess }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('BTC');
  const [isSending, setIsSending] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!recipient || !amount) {
      toast.error('Please specify both recipient and transfer amount');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast.success(`Encrypted dispatch initiated for ${amount} ${currency}`);
      setRecipient('');
      setAmount('');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Transfer Card */}
      <div className="glass-panel p-8 rounded-3xl border-slate-800 shadow-2xl relative">
        
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Quantum Asset Dispatch</h3>
            <p className="text-xs text-slate-400">Transfer sovereign funds with zero-knowledge verification</p>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Lock size={12} /> Post-Quantum Signed
          </span>
        </div>

        <form onSubmit={handleSend} className="space-y-5">
          
          {/* Recipient Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Destination Cryptographic Address
            </label>
            <div className="relative">
              <input 
                type="text" 
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="E.g. 0x71C... or bc1q..."
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 font-mono text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
            </div>
          </div>

          {/* Amount & Asset selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Transfer Amount & Asset
            </label>
            <div className="relative flex items-center">
              <input 
                type="number" 
                step="any"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-4 pr-28 py-3 text-white placeholder:text-slate-600 font-mono text-base focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              <div className="absolute right-2 top-2 bottom-2 flex items-center">
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="h-full bg-slate-800 border border-slate-700 text-cyan-300 font-bold px-3 rounded-lg text-xs focus:outline-none cursor-pointer"
                >
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="XRP">XRP</option>
                  <option value="XLM">XLM</option>
                  <option value="USDT">USDT</option>
                  <option value="SOL">SOL</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fee estimate note */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Estimated Network Gas:</span>
            <span className="text-emerald-400 font-mono font-medium">0.00004 {currency} (Optimized)</span>
          </div>

          <button 
            type="submit"
            disabled={isSending}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 hover:scale-[1.01]"
          >
            {isSending ? (
              <span>Signing Cryptographic Payload...</span>
            ) : (
              <>
                <ArrowUpRight size={18} />
                <span>Execute Quantum Dispatch</span>
              </>
            )}
          </button>
        </form>
      </div>
      
      {/* Recent Safe Destinations */}
      <div className="glass-panel p-6 rounded-2xl border-slate-800/80">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Shield size={14} className="text-cyan-400" /> Recent Verified Ledger Destinations
        </h4>
        <div className="space-y-2">
          {['0x1948...56E8 (Primary Vault)', 'bc1q92...4321 (Cold Storage)', 'rPMEX...vgu (Ripple Reserve)'].map((address, i) => (
            <button 
              key={i} 
              onClick={() => setRecipient(address.split(' ')[0])}
              className="w-full flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-xl hover:bg-slate-800/80 transition-all text-left group"
            >
              <span className="text-xs font-mono text-slate-300 group-hover:text-cyan-300">{address}</span>
              <ArrowRightCircle size={15} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
