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
      <div className="solid-panel p-8 rounded-2xl relative">
        
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--card-border)]">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Send Assets</h3>
            <p className="text-xs text-slate-400">Transfer funds securely</p>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-blue-500/10 text-blue-500">
            <Lock size={12} /> Encrypted
          </span>
        </div>

        <form onSubmit={handleSend} className="space-y-5">
          
          {/* Recipient Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Destination Address
            </label>
            <div className="relative">
              <input 
                type="text" 
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="E.g. 0x71C... or bc1q..."
                className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-xl px-4 py-3 text-white placeholder:text-slate-500 font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
                className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-xl pl-4 pr-28 py-3 text-white placeholder:text-slate-500 font-mono text-base focus:outline-none focus:border-blue-500 transition-colors"
              />
              <div className="absolute right-2 top-2 bottom-2 flex items-center">
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="h-full bg-[var(--card-bg)] border border-[var(--card-border)] text-blue-400 font-bold px-3 rounded-lg text-xs focus:outline-none cursor-pointer"
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
          <div className="p-3 rounded-xl bg-[var(--background)] border border-[var(--card-border)] text-xs text-slate-400 flex items-center justify-between">
            <span>Estimated Network Fee:</span>
            <span className="text-emerald-500 font-mono font-medium">0.00004 {currency}</span>
          </div>

          <button 
            type="submit"
            disabled={isSending}
            className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSending ? (
              <span>Signing Transaction...</span>
            ) : (
              <>
                <ArrowUpRight size={18} />
                <span>Send Assets</span>
              </>
            )}
          </button>
        </form>
      </div>
      
      {/* Recent Safe Destinations */}
      <div className="solid-panel p-6 rounded-2xl">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Shield size={14} className="text-blue-500" /> Recent Destinations
        </h4>
        <div className="space-y-2">
          {['0x1948...56E8 (Primary Wallet)', 'bc1q92...4321 (Cold Storage)', 'rPMEX...vgu (Ripple Reserve)'].map((address, i) => (
            <button 
              key={i} 
              onClick={() => setRecipient(address.split(' ')[0])}
              className="w-full flex items-center justify-between p-3 bg-[var(--background)] border border-[var(--card-border)] rounded-xl hover:border-blue-500 transition-colors text-left group"
            >
              <span className="text-xs font-mono text-slate-300 group-hover:text-blue-400">{address}</span>
              <ArrowRightCircle size={15} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
