'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function PricingPage() {
  const router = useRouter();
  const [billing, setBilling] = useState('monthly');

  const tiers = [
    {
      name: 'Starter',
      monthly: 0,
      yearly: 0,
      description: 'Essential tools to get started',
      features: [
        'Portfolio tracking for 3 wallets',
        'Daily balance refresh',
        'Email support',
        'Basic analytics'
      ],
      cta: 'Start Free'
    },
    {
      name: 'Pro',
      monthly: 19,
      yearly: 180,
      description: 'Advanced analytics and automation',
      features: [
        'Unlimited wallets and accounts',
        'Real-time price and P&L',
        'Automated alerts and rules',
        'Priority support',
        'CSV export'
      ],
      popular: true,
      cta: 'Upgrade to Pro'
    },
    {
      name: 'Enterprise',
      monthly: null,
      yearly: null,
      description: 'Security, compliance, and custom integrations',
      features: [
        'SSO and role-based access',
        'Custom integrations and APIs',
        'Dedicated account manager',
        'SLA and onboarding',
        'Security reviews'
      ],
      cta: 'Talk to Sales'
    }
  ];

  const faqs = [
    { q: 'Can I switch plans later?', a: 'Yes, you can upgrade or downgrade anytime.' },
    { q: 'Do you offer discounts for yearly billing?', a: 'Yes, Pro yearly saves over monthly pricing.' },
    { q: 'Is there a trial?', a: 'Starter is free. Pro offers a 14-day refund window.' },
    { q: 'What payment methods are accepted?', a: 'Major cards and approved enterprise invoicing.' }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold text-[var(--foreground)]">Pricing</h1>
          <p className="text-xl text-[var(--muted)] mt-4">Choose a plan that fits your workflow.</p>
          <div className="inline-flex mt-8 p-1 rounded-full bg-[var(--surface)] border border-[var(--border)]">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-4 py-2 rounded-full text-sm ${billing==='monthly' ? 'bg-[var(--accent)] text-black' : 'text-[var(--muted)]'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-4 py-2 rounded-full text-sm ${billing==='yearly' ? 'bg-[var(--accent)] text-black' : 'text-[var(--muted)]'}`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((t, i) => {
            const price = t.monthly===null ? 'Contact' : billing==='monthly' ? `$${t.monthly}/mo` : `$${t.yearly}/yr`;
            return (
              <div key={i} className={`p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)] ${t.popular ? 'ring-1 ring-white/20' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-semibold text-[var(--foreground)]">{t.name}</h3>
                  {t.popular && (
                    <span className="px-3 py-1 rounded-full text-xs bg-[var(--accent)] text-black">Most Popular</span>
                  )}
                </div>
                <p className="text-[var(--muted)] mb-4">{t.description}</p>
                <div className="text-4xl font-bold text-[var(--foreground)] mb-6">{price}</div>
                <ul className="space-y-3 mb-6">
                  {t.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[var(--muted)]">
                      <CheckCircle className="w-5 h-5 text-[var(--foreground)]" strokeWidth={1.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    const token = localStorage.getItem('token');
                    if (!token) {
                      router.push(`/signup?plan=${encodeURIComponent(t.name)}`);
                    } else {
                      router.push(`/dashboard?plan=${encodeURIComponent(t.name)}`);
                    }
                  }}
                  className="w-full py-3 rounded-full bg-[var(--accent)] text-black hover:opacity-90"
                >
                  {t.cta}
                </button>
                <div className="mt-3 text-xs text-[var(--muted)]">No hidden fees</div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((f, i) => (
              <div key={i} className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{f.q}</h3>
                <p className="text-[var(--muted)]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
