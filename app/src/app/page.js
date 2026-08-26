'use client';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  Lock, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Globe2, 
  Zap, 
  KeyRound, 
  Sparkles, 
  ChevronRight, 
  Menu, 
  X, 
  HelpCircle,
  ExternalLink,
  Wallet,
  Building2,
  Database,
  BarChart3,
  Mail,
  MapPin,
  PhoneCall,
  Check
} from "lucide-react";
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { number: "$2.8B+", label: "Verified Assets Tracked", sub: "Audited Ledger Volume" },
    { number: "99.99%", label: "Uptime & Node Availability", sub: "SLA Guaranteed" },
    { number: "180+", label: "Supported Chains & Protocols", sub: "Instant Interoperability" },
    { number: "< 0.04ms", label: "Cryptographic Sync Latency", sub: "Quantum State Settlement" }
  ];

  const cryptoTicker = [
    { symbol: "BTC", name: "Bitcoin", price: "$96,450.20", change: "+3.24%" },
    { symbol: "ETH", name: "Ethereum", price: "$3,480.50", change: "+4.12%" },
    { symbol: "XRP", name: "Ripple", price: "$2.48", change: "+8.65%" },
    { symbol: "XLM", name: "Stellar", price: "$0.44", change: "+6.10%" },
    { symbol: "SOL", name: "Solana", price: "$214.80", change: "+5.30%" },
    { symbol: "HBAR", name: "Hedera", price: "$0.29", change: "+7.45%" },
    { symbol: "USDT", name: "Tether", price: "$1.00", change: "+0.01%" }
  ];

  const trustPillars = [
    {
      icon: Cpu,
      title: "Quantum-Resilient Cryptography",
      description: "Protected against post-quantum decryption algorithms with state-of-the-art lattice-based encryption (NIST-approved standards).",
      badge: "Post-Quantum Security"
    },
    {
      icon: KeyRound,
      title: "MPC Threshold Key Sharding",
      description: "Private keys never exist in a single location. Multi-Party Computation shards credentials across air-gapped, decentralized cryptographic vaults.",
      badge: "Zero Single-Point Failure"
    },
    {
      icon: Database,
      title: "Continuous Proof-of-Reserves",
      description: "Cryptographically verifiable Merkle-tree reserve verification running continuous 24/7 audits for absolute ledger transparency.",
      badge: "Real-time Verification"
    },
    {
      icon: Layers,
      title: "Institutional Cross-Chain Protocol",
      description: "Synchronize Bitcoin, EVM, Ripple, Stellar, and Solana balances under a unified, sovereign ledger architecture.",
      badge: "Multi-Chain Native"
    }
  ];

  const features = [
    {
      title: "Unified Wealth & Asset Dashboard",
      description: "Consolidate cold storage, hot wallets, staking nodes, and centralized holdings in an institutional-grade portfolio interface.",
      icon: BarChart3
    },
    {
      title: "Deterministic Recovery Phrase Verification",
      description: "Verify, test, and link recovery phrases using zero-knowledge proofs that validate ownership without ever exposing keys.",
      icon: Shield
    },
    {
      title: "Hardware & Cold Ledger Integration",
      description: "Seamlessly bind Ledger, Trezor, Tangem, D'CENT, and air-gapped devices into your consolidated ledger matrix.",
      icon: Wallet
    },
    {
      title: "Real-Time Fraud & Anomaly Shield",
      description: "Heuristic machine-learning algorithms monitor connected addresses to flag malicious contract interactions and unauthorized drainers.",
      icon: Zap
    },
    {
      title: "Institutional Audit & Export Trails",
      description: "One-click generation of tax, audit, and regulatory compliance reports verified with timestamped cryptographic hashes.",
      icon: Building2
    },
    {
      title: "24/7 Dedicated Concierge Node Support",
      description: "Priority enterprise support with assigned cryptographic engineers and dedicated network routing for enterprise clients.",
      icon: Globe2
    }
  ];

  const complianceBadges = [
    "SOC 2 Type II Certified",
    "ISO/IEC 27001 Standard",
    "CCSS Level 3 Custodial",
    "FIPS 140-3 Hardware Standard",
    "GDPR & CCPA Compliant"
  ];

  const faqs = [
    {
      q: "What makes Quantum Financial Ledger different from ordinary crypto trackers?",
      a: "Unlike typical trackers that only pull public API data, Quantum Financial Ledger operates as a sovereign cryptographic ledger. It employs post-quantum encryption standards, MPC key management, and zero-knowledge proof verification so you maintain complete non-custodial ownership of your assets."
    },
    {
      q: "How does the external wallet linking and recovery verification work?",
      a: "When you connect an external wallet (such as Trust Wallet, MetaMask, Ledger, or Binance), our system validates your cryptographic address and synchronizes your balances into your secure ledger view. You receive an instant verification receipt and email confirmation containing an immutable reference number."
    },
    {
      q: "Is Quantum Financial Ledger non-custodial?",
      a: "Yes. You maintain sovereign control over your funds at all times. The platform never holds custody of your underlying private keys or moves funds without your explicit cryptographic authorization."
    },
    {
      q: "How are my ledger balances updated in real time?",
      a: "Our distributed node infrastructure listens to real-time mempools and block confirmations across all major blockchains (Bitcoin, Ethereum, Ripple, Stellar, Solana, etc.) to update your ledger valuation with sub-second accuracy."
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white">
      
      {/* Top Trust Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-b border-cyan-500/20 text-xs py-2 px-4 text-center">
        <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Quantum Network Status: Operational
          </span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-300 hidden sm:inline">256-bit Post-Quantum Cryptography Active</span>
          <span className="text-slate-500 hidden md:inline">•</span>
          <span className="text-slate-400 hidden md:inline">Proof of Reserve SLA: 99.99%</span>
        </div>
      </div>

      {/* Glassmorphic Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div 
              onClick={() => router.push('/')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  Quantum <span className="text-cyan-400">Ledger</span>
                </div>
                <div className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">Financial Protocol</div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-cyan-400 transition-colors">Core Features</a>
              <a href="#security" className="hover:text-cyan-400 transition-colors">Security Architecture</a>
              <a href="#compliance" className="hover:text-cyan-400 transition-colors">Trust & Compliance</a>
              <a href="/mission" className="hover:text-cyan-400 transition-colors">Our Mission</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => router.push('/login')} 
                className="px-5 py-2.5 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-xl border border-slate-700/60 transition-all"
              >
                Sign In
              </button>
              <button 
                onClick={() => router.push('/signup')} 
                className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Open Ledger Account
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-slate-300 hover:text-white" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          {isMenuOpen && (
            <div className="lg:hidden pt-4 pb-3 border-t border-slate-800 mt-4 space-y-3">
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-white">Core Features</a>
              <a href="#security" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-white">Security Architecture</a>
              <a href="#compliance" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-white">Trust & Compliance</a>
              <a href="/mission" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-white">Our Mission</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-white">Contact</a>
              <div className="pt-3 flex flex-col gap-2">
                <button 
                  onClick={() => router.push('/login')} 
                  className="w-full py-2.5 text-sm text-center font-medium text-slate-200 bg-slate-800 rounded-xl"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => router.push('/signup')} 
                  className="w-full py-2.5 text-sm text-center font-semibold text-slate-950 bg-cyan-400 rounded-xl"
                >
                  Open Ledger Account
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        {/* Ambient Grid pattern */}
        <div className="absolute inset-0 bg-mesh-pattern opacity-40 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left Content */}
            <div className="lg:w-7/12 text-center lg:text-left space-y-8">
              
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium backdrop-blur-md shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Next-Gen Sovereign Asset Management</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-slate-400">Institutional Protocol</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                The Institutional Standard for <br />
                <span className="gradient-text-cyan">Quantum-Resistant</span> Web3 Financial Ledgers.
              </h1>

              {/* Description */}
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Consolidate, protect, and track multi-chain portfolios with lattice-based post-quantum cryptography, zero-knowledge ownership verification, and hardware-grade security protocols.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button 
                  onClick={() => router.push('/signup')} 
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02]"
                >
                  <span>Open Institutional Ledger</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => router.push('/secure-wallet')} 
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700/80 hover:border-cyan-500/40 backdrop-blur-lg transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>Link & Verify External Wallet</span>
                </button>
              </div>

              {/* Security checkmarks */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Non-Custodial Ownership
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> End-to-End Encrypted
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time Proof of Reserves
                </span>
              </div>
            </div>

            {/* Right Interactive Ledger Visual */}
            <div className="lg:w-5/12 w-full max-w-lg mx-auto">
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-slate-900/60 shadow-2xl shadow-cyan-500/10">
                <div className="glass-panel rounded-[22px] p-6 space-y-6">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">Quantum Node #0492</h3>
                        <p className="text-xs text-slate-400">Consensus Engine Active</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified
                    </span>
                  </div>

                  {/* Vault Balance Display */}
                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Consolidated Ledger Valuation</div>
                    <div className="text-3xl font-extrabold text-white mt-1 font-mono tracking-tight">$428,940.85 <span className="text-xs text-emerald-400 font-sans font-normal">+12.4% 24h</span></div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                      <span>Reserve Ratio: 100% Backed</span>
                      <span className="text-cyan-400 font-mono">Synced @ block #19,482,912</span>
                    </div>
                  </div>

                  {/* Multi-chain Asset preview */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Multi-Chain Nodes</div>
                    
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold font-mono">₿</div>
                        <div>
                          <div className="text-xs font-medium text-white">Bitcoin Cold Ledger</div>
                          <div className="text-[10px] text-slate-400 font-mono">2.4500 BTC</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-white">$236,302.99</div>
                        <div className="text-[10px] text-emerald-400">Vault Secure</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold font-mono">Ξ</div>
                        <div>
                          <div className="text-xs font-medium text-white">Ethereum Staking Vault</div>
                          <div className="text-[10px] text-slate-400 font-mono">35.0000 ETH</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-white">$121,817.50</div>
                        <div className="text-[10px] text-emerald-400">MPC Multi-Sig</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">✕</div>
                        <div>
                          <div className="text-xs font-medium text-white">Ripple & Stellar Reserve</div>
                          <div className="text-[10px] text-slate-400 font-mono">28,500 XRP</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-white">$70,820.36</div>
                        <div className="text-[10px] text-emerald-400">Audited Reserve</div>
                      </div>
                    </div>
                  </div>

                  {/* Micro encryption visual */}
                  <div className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-xl text-xs flex items-center justify-between">
                    <span className="text-cyan-300 flex items-center gap-1.5 font-mono">
                      <Lock className="w-3.5 h-3.5 text-cyan-400" /> AES-GCM-256 / Kyber-1024
                    </span>
                    <span className="text-slate-400 text-[10px]">Zero Exposure</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Crypto Price Marquee Ribbon */}
      <div className="border-y border-slate-800/80 bg-slate-950/60 py-3 overflow-hidden">
        <div className="animate-marquee flex items-center gap-8">
          {[...cryptoTicker, ...cryptoTicker].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs font-mono shrink-0 px-4 py-1 rounded-lg bg-slate-900/40 border border-slate-800/50">
              <span className="font-bold text-white">{item.symbol}</span>
              <span className="text-slate-400">{item.price}</span>
              <span className={item.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Key Stats Section */}
      <section className="py-20 border-b border-slate-800/60 bg-gradient-to-b from-[#030712] via-slate-950 to-[#030712]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border-slate-800/80 text-center relative overflow-hidden group hover:border-cyan-500/30 transition-all">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-3xl lg:text-4xl font-extrabold text-white font-mono mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-slate-300 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Pillars of Institutional Trust */}
      <section id="security" className="py-24 relative">
        <div className="container mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              Security Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Built on Institutional Trust & Quantum Resilience
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Standard encryption methods will fail against next-generation quantum computing. Quantum Financial Ledger integrates cutting-edge cryptographic protections today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {trustPillars.map((pillar, i) => (
              <div 
                key={i} 
                className="glass-panel p-8 rounded-2xl border-slate-800/80 hover:border-cyan-500/40 transition-all group relative"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <pillar.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-cyan-300 font-medium">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Core Platform Capabilities */}
      <section id="features" className="py-24 bg-slate-950/60 border-t border-slate-800/80">
        <div className="container mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              Comprehensive Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Enterprise-Grade Web3 Ledger Features
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Designed for high-net-worth individuals, institutional treasuries, and sovereign capital allocators demanding flawless accounting precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div 
                key={i} 
                className="glass-panel p-6 rounded-2xl border-slate-800 hover:border-cyan-500/30 transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center mb-4 text-cyan-400">
                  <feat.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Compliance & Security Standards */}
      <section id="compliance" className="py-20 border-t border-slate-800/80 bg-gradient-to-b from-[#030712] to-slate-950">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-6">
            Audited & Compliant With Global Security Frameworks
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
            {complianceBadges.map((badge, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-300 text-xs font-medium shadow-sm hover:border-slate-700"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security FAQ Section */}
      <section className="py-24 border-t border-slate-800/80">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Everything you need to know about our quantum-secured ledger</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="glass-panel rounded-2xl border-slate-800/80 overflow-hidden transition-all"
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-90 text-cyan-400' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact / Concierge Section */}
      <section id="contact" className="py-24 border-t border-slate-800/80 bg-slate-950/60 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase">
                Institutional Concierge
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Connect with our Sovereign Ledger Specialists
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Have questions regarding cold storage integration, multi-wallet consolidation, or API enterprise feeds? Our engineers are available around the clock.
              </p>

              <div className="space-y-4 pt-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>support@qfsweb3.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span>GPG Key: 0x9482_E49A_7721_BCF9</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <span>Global 24/7 Decentralized Dispatch</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-panel p-8 rounded-3xl border-slate-800/80 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-6">Inquire with Ledger Concierge</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Your inquiry has been logged in our secure ledger. A specialist will contact you shortly.");
                }} 
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="E.g. Alexander Vance"
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="alexander@institution.com"
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Message / Inquiry</label>
                  <textarea 
                    rows={3} 
                    required 
                    placeholder="Describe your ledger integration requirements..."
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-500/50 resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01]"
                >
                  Send Encrypted Inquiry
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* High-Trust Footer */}
      <footer className="border-t border-slate-800 bg-[#020617] text-slate-400 text-xs py-14">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-base font-bold text-white">Quantum Financial Ledger</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Next-generation post-quantum cryptographic ledger protocol for sovereign asset tracking, proof-of-reserves, and multi-chain reconciliation.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                All Decentralized Ledger Nodes Synced & Healthy
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Ledger Architecture</h4>
              <ul className="space-y-2">
                <li><a href="#security" className="hover:text-cyan-400 transition-colors">Post-Quantum Encryption</a></li>
                <li><a href="#security" className="hover:text-cyan-400 transition-colors">MPC Key Sharding</a></li>
                <li><a href="#features" className="hover:text-cyan-400 transition-colors">Proof of Reserves</a></li>
                <li><a href="/secure-wallet" className="hover:text-cyan-400 transition-colors">External Wallet Link</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Protocol & Company</h4>
              <ul className="space-y-2">
                <li><a href="/mission" className="hover:text-cyan-400 transition-colors">Our Mission</a></li>
                <li><a href="#compliance" className="hover:text-cyan-400 transition-colors">Trust & Audits</a></li>
                <li><a href="/login" className="hover:text-cyan-400 transition-colors">Member Sign In</a></li>
                <li><a href="/signup" className="hover:text-cyan-400 transition-colors">Open Account</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Security & Compliance</h4>
              <ul className="space-y-2">
                <li><span className="text-slate-400">SOC 2 Type II</span></li>
                <li><span className="text-slate-400">ISO/IEC 27001</span></li>
                <li><span className="text-slate-400">CCSS Level 3</span></li>
                <li><span className="text-slate-400">FIPS 140-3 Cryptography</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div>
              © {new Date().getFullYear()} Quantum Financial Ledger Protocol (QFL). All rights reserved. Sovereign Cryptographic Infrastructure.
            </div>
            <div className="flex items-center gap-6">
              <span>Non-Custodial</span>
              <span>256-Bit SSL Encrypted</span>
              <span>Privacy Verified</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
