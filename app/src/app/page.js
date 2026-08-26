'use client';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  Lock, 
  Activity, 
  ArrowRight,
  Wallet,
  Menu,
  X,
  CheckCircle2,
  BarChart3,
  Globe2
} from "lucide-react";
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { number: "$2.8B+", label: "Assets Tracked" },
    { number: "99.99%", label: "Uptime" },
    { number: "180+", label: "Supported Assets" },
    { number: "24/7", label: "Security Monitoring" }
  ];

  const [cryptoTicker, setCryptoTicker] = useState([
    { symbol: "BTC", id: "bitcoin", price: "---", change: "---" },
    { symbol: "ETH", id: "ethereum", price: "---", change: "---" },
    { symbol: "XRP", id: "ripple", price: "---", change: "---" },
    { symbol: "SOL", id: "solana", price: "---", change: "---" },
    { symbol: "USDT", id: "tether", price: "$1.00", change: "+0.01%" }
  ]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,solana,tether&vs_currencies=usd&include_24h_change=true&_t=${Date.now()}`, { cache: 'no-store' });
        const data = await response.json();
        setCryptoTicker(prev => prev.map(coin => {
          if (data[coin.id]) {
            const price = data[coin.id].usd;
            const change = data[coin.id].usd_24h_change || 0;
            return {
              ...coin,
              price: `$${price >= 1 ? price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : price.toString()}`,
              change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
            };
          }
          return coin;
        }));
      } catch (err) {
        console.error("Error fetching crypto prices:", err);
      }
    };
    
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Portfolio Dashboard",
      description: "Consolidate all your crypto holdings in one secure interface.",
      icon: BarChart3
    },
    {
      title: "Wallet Linking",
      description: "Securely link external wallets to track balances and transactions seamlessly.",
      icon: Wallet
    },
    {
      title: "Industry-Leading Security",
      description: "We use advanced encryption to ensure your data and privacy are always protected.",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-slate-100 font-sans selection:bg-blue-500/30 selection:text-white">
      
      {/* Navbar */}
      <nav className="border-b border-[var(--card-border)] bg-[var(--background)] sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <div 
            onClick={() => router.push('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="text-xl font-bold tracking-tight text-white">
              QFS Ledger
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
            <a href="#contact" className="hover:text-white transition-colors">Support</a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => router.push('/login')} 
              className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => router.push('/signup')} 
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-300 hover:text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-[var(--card-border)] px-6 py-4 space-y-4 bg-[var(--card-bg)]">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-slate-300 hover:text-white">Features</a>
            <a href="#security" onClick={() => setIsMenuOpen(false)} className="block text-slate-300 hover:text-white">Security</a>
            <button 
              onClick={() => router.push('/login')} 
              className="w-full py-2.5 text-sm font-medium text-white bg-slate-800 rounded-lg"
            >
              Sign In
            </button>
            <button 
              onClick={() => router.push('/signup')} 
              className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Manage your digital assets securely.
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0">
              The premier crypto manager and portfolio tracker. Consolidate your holdings, monitor real-time prices, and secure your financial future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={() => router.push('/signup')} 
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-colors flex items-center justify-center gap-2"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => router.push('/secure-wallet')} 
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-blue-400" />
                Link External Wallet
              </button>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-400 flex-wrap pt-4">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Secure Storage</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time Data</span>
            </div>
          </div>

          <div className="lg:w-1/2 w-full max-w-md mx-auto">
            <div className="solid-panel rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">QFS Wallet Status</h3>
                    <p className="text-xs text-emerald-400">Online & Synced</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 rounded-xl p-6 mb-6">
                <div className="text-sm text-slate-400 mb-2">Total Balance</div>
                <div className="text-4xl font-bold text-white mb-2">$428,940.85</div>
                <div className="text-emerald-500 text-sm font-medium">+12.4% (24h)</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-sm font-medium">Bitcoin (BTC)</span>
                  <span className="text-sm text-slate-300">2.45 BTC</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                  <span className="text-sm font-medium">Ethereum (ETH)</span>
                  <span className="text-sm text-slate-300">35.0 ETH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="border-y border-[var(--card-border)] bg-[var(--card-bg)] py-3 overflow-hidden">
        <div className="animate-marquee flex items-center gap-8">
          {[...cryptoTicker, ...cryptoTicker].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm font-medium shrink-0 px-4">
              <span className="text-white">{item.symbol}</span>
              <span className="text-slate-400">{item.price}</span>
              <span className={item.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="py-20 border-b border-[var(--card-border)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything you need</h2>
            <p className="text-slate-400 text-lg">A unified platform for all your digital asset management needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <div key={i} className="solid-panel p-8 rounded-2xl solid-panel-hover">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                  <feat.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--card-border)] bg-[var(--card-bg)] text-slate-400 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-bold text-white">QFS Ledger</span>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} QFS Ledger. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
