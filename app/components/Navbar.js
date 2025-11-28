import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet, ArrowRightCircle, ArrowLeftCircle, RefreshCw, History, Bell, LogOut, Menu, ChevronDown, Settings, LayoutDashboard, User } from 'lucide-react';
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
    { id: 'overview', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { id: 'send', icon: <ArrowRightCircle size={20} />, label: 'Send' },
    { id: 'receive', icon: <ArrowLeftCircle size={20} />, label: 'Receive' },
    { id: 'swap', icon: <RefreshCw size={20} />, label: 'Swap' },
    { id: 'history', icon: <History size={20} />, label: 'History' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-white text-xl font-bold">QFS Ledger</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTab(item.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedTab === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <Bell size={20} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all ${
                  showProfileMenu ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <ChevronDown size={16} />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 border border-white/10">
                  <button
                    onClick={() => {
                      router.push('/profile');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/5 flex items-center"
                  >
                    <User size={16} className="mr-2" /> Profile
                  </button>
                  <button
                    onClick={() => router.push('/settings')}
                    className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/5 flex items-center"
                  >
                    <Settings size={16} className="mr-2" /> Settings
                  </button>
                  <hr className="border-white/10 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
