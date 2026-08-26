'use client';
import { useRouter } from 'next/navigation';
import { Shield, ArrowLeft, CheckCircle2, Cpu, Globe2, Lock, Sparkles, Scale, Eye } from 'lucide-react';

export default function Mission() {
  const router = useRouter();

  const stats = [
    { number: "$2.8B+", label: "Verified Assets Audited", sub: "100% Cryptographic Reserve" },
    { number: "99.99%", label: "Consensus SLA Uptime", sub: "Fault-Tolerant Sharding" },
    { number: "180+", label: "Interoperable Networks", sub: "Unified Ledger Protocol" }
  ];

  const values = [
    {
      title: "Post-Quantum Cryptographic Sovereignty",
      description: "We believe financial privacy and asset ownership are foundational human rights. We build protocols resistant to future computational threats to safeguard multi-generational wealth.",
      icon: Cpu
    },
    {
      title: "Mathematical Transparency & Zero-Knowledge",
      description: "True trust requires no blind faith. Every balance, transaction, and state transition in the Quantum Financial Ledger is verifiable through cryptographic proof-of-reserves.",
      icon: Eye
    },
    {
      title: "Non-Custodial Absolute Control",
      description: "Users retain 100% cryptographic sovereignty over their credentials and digital property. No centralized authority can freeze, rehypothecate, or manipulate your ledger state.",
      icon: Lock
    },
    {
      title: "Borderless Global Interoperability",
      description: "Bridging disparate distributed networks—Bitcoin, Ethereum, Ripple, Stellar, and beyond—into a single, high-fidelity institutional ledger accessible anywhere on Earth.",
      icon: Globe2
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Nav */}
      <div className="container mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/80">
        <div 
          onClick={() => router.push('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Quantum <span className="text-cyan-400">Ledger</span></span>
        </div>

        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-5xl">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>The Quantum Manifesto</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Architecting the Future of <br />
            <span className="gradient-text-cyan">Sovereign Cryptographic Trust</span>.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Quantum Financial Ledger was founded on a simple premise: traditional financial infrastructure is obsolete, centralized crypto custody is hazardous, and emerging quantum computing capabilities will invalidate legacy security. We provide the institutional bridge to true sovereign wealth.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          {stats.map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border-slate-800/80 text-center">
              <div className="text-4xl font-extrabold text-white font-mono mb-2 tracking-tight">
                {stat.number}
              </div>
              <div className="text-sm font-semibold text-slate-300 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="space-y-10 mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">Foundational Pillars</h2>
            <p className="text-slate-400 text-sm mt-2">The non-negotiable principles governing our protocol engineering</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-2xl border-slate-800/80 hover:border-cyan-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 glass-panel p-10 rounded-3xl border-slate-800 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white">Join the Sovereign Ledger Protocol</h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Experience uncompromised asset security, proof-of-reserves, and real-time institutional portfolio reconciliation.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push('/signup')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all"
            >
              Open Ledger Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
