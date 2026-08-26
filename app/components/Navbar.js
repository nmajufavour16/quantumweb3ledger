'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Wallet, 
  ArrowRightCircle, 
  ArrowLeftCircle, 
  RefreshCw, 
  History, 
  Bell, 
  LogOut, 
  Menu, 
  ChevronDown, 
  Settings, 
  LayoutDashboard, 
  User, 
  Shield, 
  KeyRound 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Navbar({ selectedTab, setSelectedTab, isMenuOpen, setIsMenuOpen }) {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const navItems = [
    { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { id: 'send', icon: <ArrowRightCircle size={18} />, label: 'Send' },
    { id: 'receive', icon: <ArrowLeftCircle size={18} />, label: 'Receive' },
    { id: 'wallets', icon: <Wallet size={18} />, label: 'Linked Wallets' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => {
              if (selectedTab !== 'overview') setSelectedTab('overview');
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] shadow-sm">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-white text-base font-bold tracking-tight">Quantum <span className="text-cyan-400">Ledger</span></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1.5 bg-slate-900/60 p-1 rounded-xl border border-slate-800/60">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTab === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Node 99.99%</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex items-center space-x-2 p-1.5 rounded-xl border transition-all ${
                  showProfileMenu 
                    ? 'bg-slate-800 border-cyan-500/40 text-white' 
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                  <User size={15} className="text-slate-950 font-bold" />
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-2xl py-1.5 border border-slate-800 z-50">
                  <div className="px-4 py-2 border-b border-slate-800/80">
                    <p className="text-xs font-semibold text-white">Ledger Vault Session</p>
                    <p className="text-[10px] text-cyan-400 font-mono">256-Bit Encrypted</p>
                  </div>

                  <button
                    onClick={() => {
                      router.push('/profile');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <User size={15} className="text-slate-400" /> Account Profile
                  </button>

                  <button
                    onClick={() => {
                      router.push('/change-password');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <KeyRound size={15} className="text-slate-400" /> Rotate Vault Key
                  </button>

                  <div className="border-t border-slate-800/80 my-1" />
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2.5 transition-colors"
                  >
                    <LogOut size={15} /> Terminate Session (Logout)
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
