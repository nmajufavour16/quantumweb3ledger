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
  Globe2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { value: 2.8, decimals: 1, prefix: "$", suffix: "B+", label: "Assets Tracked" },
    { value: 99.99, decimals: 2, prefix: "", suffix: "%", label: "Uptime" },
    { value: 180, decimals: 0, prefix: "", suffix: "+", label: "Supported Assets" },
    { value: 24, decimals: 0, prefix: "", suffix: "/7", label: "Security Monitoring" }
  ];

  const faqs = [
    {
      question: "How secure is QFS Ledger?",
      answer: "We utilize military-grade encryption and secure cryptographic architectures. Your data and private keys are never exposed, ensuring maximum sovereignty over your digital wealth."
    },
    {
      question: "Can I link multiple external wallets?",
      answer: "Yes, you can securely link multiple wallets including MetaMask, TrustWallet, and Ledger hardware wallets to consolidate your portfolio view."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No. Transparency is core to our ethos. Standard network gas fees apply for on-chain transactions, but QFS Ledger does not charge hidden management fees."
    },
    {
      question: "What happens if I lose my Master Password?",
      answer: "Because we prioritize user sovereignty, we cannot recover your Master Password. We strongly advise backing up your seed phrases and passwords in a secure, offline environment."
    }
  ];

  function AnimatedCounter({ value, decimals = 0, prefix = "", suffix = "", duration = 2000 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTime = null;
      let animationFrame;
      
      const animate = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(easeProgress * value);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [value, duration]);

    return <>{prefix}{count.toFixed(decimals)}{suffix}</>;
  }

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
        console.error("Error fetching initial crypto prices:", err);
      }
    };
    
    fetchPrices();

    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker/ethusdt@ticker/xrpusdt@ticker/solusdt@ticker');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const symbolMap = {
        'BTCUSDT': 'bitcoin',
        'ETHUSDT': 'ethereum',
        'XRPUSDT': 'ripple',
        'SOLUSDT': 'solana'
      };
      
      const coinId = symbolMap[data.s];
      if (coinId) {
        setCryptoTicker(prev => prev.map(coin => {
          if (coin.id === coinId) {
            const price = parseFloat(data.c);
            const change = parseFloat(data.P);
            return {
              ...coin,
              price: `$${price >= 1 ? price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : price.toString()}`,
              change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
            };
          }
          return coin;
        }));
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      ws.close();
    };
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
    <div className="min-h-screen bg-[var(--background)] text-slate-100 font-sans selection:bg-blue-500/30 selection:text-white relative">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/15 via-[var(--background)] to-[var(--background)] pointer-events-none" />

      {/* Navbar */}
      <nav className="border-b border-[var(--card-border)] bg-[var(--background)] sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <div 
            onClick={() => router.push('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img src="/logo.jpg" alt="QFS Ledger Logo" className="w-10 h-10 rounded-lg object-cover shadow-lg shadow-blue-500/20" />
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
      <section className="py-24 container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:w-1/2 text-center lg:text-left space-y-8 relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
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
      <section className="py-20 border-b border-[var(--card-border)] relative z-10 bg-slate-900/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  <AnimatedCounter 
                    value={stat.value} 
                    decimals={stat.decimals} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                  />
                </div>
                <div className="text-slate-400 text-sm font-medium tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Coins Section */}
      <section className="py-24 border-t border-[var(--card-border)] bg-[#050505] overflow-hidden relative z-10">
        <div className="container mx-auto px-6 mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Thousands of supported coins and tokens.</h2>
          <p className="text-slate-400 text-sm font-mono tracking-wide">
            Supported for Bitcoin, USDT, Ethereum, Avalanche, Polygon, Matic, Litecoin, TRX and much more...
          </p>
        </div>

        {/* Marquee Rows */}
        <div className="relative flex flex-col gap-8 py-4">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
          
          {/* Row 1 - scrolling left */}
          <div className="flex w-max animate-marquee">
            {[1, 2].map((set) => (
              <div key={set} className="flex gap-8 pr-8">
                {[
                  { name: 'Solana', src: 'https://cryptologos.cc/logos/solana-sol-logo.svg', color: '#9945FF' },
                  { name: 'Tether', src: 'https://cryptologos.cc/logos/tether-usdt-logo.svg', color: '#26A17B' },
                  { name: 'Bitcoin', src: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg', color: '#F7931A' },
                  { name: 'Ethereum', src: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg', color: '#627EEA' },
                  { name: 'Ripple', src: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg', color: '#23292F' },
                  { name: 'Cardano', src: 'https://cryptologos.cc/logos/cardano-ada-logo.svg', color: '#0033AD' },
                  { name: 'Avalanche', src: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg', color: '#E84142' },
                  { name: 'Polygon', src: 'https://cryptologos.cc/logos/polygon-matic-logo.svg', color: '#8247E5' }
                ].map((icon, idx) => (
                  <div key={`${set}-${idx}`} className="w-16 h-16 rounded-full bg-slate-900/30 flex items-center justify-center relative group overflow-hidden">
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300" style={{ backgroundColor: icon.color }}></div>
                    <img src={icon.src} alt={icon.name} className="w-8 h-8 object-contain relative z-10 drop-shadow-md" />
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Row 2 - scrolling right */}
          <div className="flex w-max animate-marquee-reverse -ml-24">
            {[1, 2].map((set) => (
              <div key={set} className="flex gap-8 pr-8">
                {[
                  { name: 'Binance', src: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg', color: '#F3BA2F' },
                  { name: 'Polkadot', src: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg', color: '#E6007A' },
                  { name: 'Dogecoin', src: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg', color: '#C2A633' },
                  { name: 'Chainlink', src: 'https://cryptologos.cc/logos/chainlink-link-logo.svg', color: '#2A5ADA' },
                  { name: 'Litecoin', src: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg', color: '#345D9D' },
                  { name: 'Tron', src: 'https://cryptologos.cc/logos/tron-trx-logo.svg', color: '#FF0013' },
                  { name: 'Uniswap', src: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg', color: '#FF007A' },
                  { name: 'Stellar', src: 'https://cryptologos.cc/logos/stellar-xlm-logo.svg', color: '#14B6E7' }
                ].map((icon, idx) => (
                  <div key={`${set}-${idx}`} className="w-16 h-16 rounded-full bg-slate-900/30 flex items-center justify-center relative group overflow-hidden">
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300" style={{ backgroundColor: icon.color }}></div>
                    <img src={icon.src} alt={icon.name} className="w-8 h-8 object-contain relative z-10 drop-shadow-md" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything you need</h2>
            <p className="text-slate-400 text-lg">A unified platform for all your digital asset management needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <div key={i} className="solid-panel p-8 rounded-2xl solid-panel-hover group cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                  <feat.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-t border-[var(--card-border)] bg-slate-900/10 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg">Got questions? We have answers.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="solid-panel rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  {activeFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>
                <div 
                  className={`px-6 text-slate-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                    activeFaq === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {faq.answer}
                </div>
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
