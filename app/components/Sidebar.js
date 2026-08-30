'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Wallet, 
  ArrowRightCircle, 
  ArrowLeftCircle, 
  LogOut, 
  LayoutDashboard, 
  User, 
  Shield, 
  KeyRound,
  CreditCard
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Sidebar({ selectedTab, setSelectedTab }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const navItems = [
    { id: 'overview', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { id: 'send', icon: <ArrowRightCircle size={20} />, label: 'Send' },
    { id: 'receive', icon: <ArrowLeftCircle size={20} />, label: 'Receive' },
    { id: 'buy', icon: <CreditCard size={20} />, label: 'Buy' },
    { id: 'wallets', icon: <Wallet size={20} />, label: 'Wallets' },
  ];

  const accountItems = [
    { id: 'profile', icon: <User size={20} />, label: 'Profile', onClick: () => router.push('/profile') },
    { id: 'password', icon: <KeyRound size={20} />, label: 'Security', onClick: () => router.push('/change-password') },
    { id: 'logout', icon: <LogOut size={20} />, label: 'Logout', onClick: handleLogout, danger: true },
  ];

  return (
    <div className="w-64 h-screen bg-[var(--card-bg)] border-r border-[var(--card-border)] flex flex-col fixed top-0 left-0">
      {/* Logo */}
      <div 
        onClick={() => setSelectedTab('overview')}
        className="h-20 flex items-center gap-3 px-6 cursor-pointer border-b border-[var(--card-border)] hover:bg-slate-900 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
          <img src="/logo.jpg" alt="QFS Ledger Logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-white text-lg font-bold tracking-tight">QFS Ledger</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Navigation</div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              selectedTab === item.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[var(--background)]'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Account Bottom Section */}
      <div className="p-4 border-t border-[var(--card-border)] space-y-2">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Account</div>
        {accountItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              item.danger
                ? 'text-red-500 hover:bg-red-500/10'
                : 'text-slate-400 hover:text-white hover:bg-[var(--background)]'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
        
        {/* Status indicator */}
        <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-mono justify-center border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Status: OK</span>
        </div>
      </div>
    </div>
  );
}
