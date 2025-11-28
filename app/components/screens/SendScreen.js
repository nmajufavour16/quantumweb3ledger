'use client';
import { ArrowRightCircle, Search } from 'lucide-react';

export default function SendScreen() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Send Crypto</h3>
        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Recipient Address"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <input 
              type="number" 
              placeholder="Amount"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            />
            <select className="absolute right-2 top-2 bg-gray-700 text-white px-3 py-1 rounded-lg">
              <option>BTC</option>
              <option>ETH</option>
              <option>USDT</option>
              <option>XRP</option>
            </select>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2">
            <ArrowRightCircle size={20} />
            Send Now
          </button>
        </div>
      </div>
      
      <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Recipients</h3>
        <div className="space-y-3">
          {['0x1234...5678', '0x8765...4321', '0x9876...1234'].map((address, i) => (
            <button key={i} className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10">
              <span className="text-white">{address}</span>
              <ArrowRightCircle size={18} className="text-blue-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
