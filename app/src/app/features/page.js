'use client';
import { Network, Link2, Shield, BarChart2, Wallet, Lock, Activity, Layers } from 'lucide-react';

export default function FeaturesPage() {
  const core = [
    { title: 'DeFi Integration', desc: 'Connect to hundreds of protocols across chains', icon: Network },
    { title: 'Cross-Chain Bridge', desc: 'Seamlessly transfer assets between networks', icon: Link2 },
    { title: 'Smart Contract Security', desc: 'Audited contracts and best practices', icon: Shield },
  ];

  const advanced = [
    { title: 'Real-time Analytics', desc: 'Live price, P&L, and risk signals', icon: BarChart2 },
    { title: 'Multi-Wallet Support', desc: 'Aggregate portfolios across chains', icon: Wallet },
    { title: 'Zero-Knowledge Mode', desc: 'Protect sensitive data with privacy tooling', icon: Lock },
    { title: 'Automated Alerts', desc: 'Custom rules for market or wallet events', icon: Activity },
  ];

  const architecture = [
    { title: 'Modular Design', desc: 'Composable services and clear boundaries', icon: Layers },
    { title: 'Secure By Default', desc: 'Least privilege and hardened endpoints', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-8 text-[var(--foreground)]">Features</h1>
        <p className="text-xl text-[var(--muted)] mb-12">Tools built for traders and teams.</p>

        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Core</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {core.map((f, i) => (
            <div key={i} className="p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <f.icon className="w-8 h-8 mb-4 text-[var(--foreground)]" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">{f.title}</h3>
              <p className="text-[var(--muted)]">{f.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Advanced</h2>
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {advanced.map((f, i) => (
            <div key={i} className="p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <f.icon className="w-8 h-8 mb-4 text-[var(--foreground)]" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{f.title}</h3>
              <p className="text-[var(--muted)]">{f.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Architecture</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {architecture.map((f, i) => (
            <div key={i} className="p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <f.icon className="w-8 h-8 mb-4 text-[var(--foreground)]" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{f.title}</h3>
              <p className="text-[var(--muted)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
