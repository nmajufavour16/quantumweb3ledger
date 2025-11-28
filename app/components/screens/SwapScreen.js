'use client';
import { RefreshCw, ArrowDownUp } from 'lucide-react';

export default function SwapScreen() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Swap Crypto</h3>
        <div className="space-y-4">
          <div className="relative">
            <input 
              type="number" 
              placeholder="You Pay"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            />
            <select className="absolute right-2 top-2 bg-gray-700 text-white px-3 py-1 rounded-lg">
              <option>BTC</option>
              <option>ETH</option>
              <option>USDT</option>
            </select>
          </div>
          
          <div className="flex justify-center">
            <button className="p-2 bg-purple-500/20 rounded-lg text-purple-500">
              <ArrowDownUp size={20} />
            </button>
          </div>

          <div className="relative">
            <input 
              type="number" 
              placeholder="You Receive"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            />
            <select className="absolute right-2 top-2 bg-gray-700 text-white px-3 py-1 rounded-lg">
              <option>ETH</option>
              <option>BTC</option>
              <option>USDT</option>
            </select>
          </div>

          <button className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2">
            <RefreshCw size={20} />
            Swap Now
          </button>
        </div>
      </div>
    </div>
  );
}
