'use client';

export default function AboutPage() {
  const values = [
    { title: 'Innovation', description: "Continuously pushing what's possible in crypto management." },
    { title: 'Transparency', description: 'Building trust through clear communication.' },
    { title: 'Security', description: "Protecting users' assets with industry-leading measures." },
    { title: 'Accessibility', description: 'Making crypto management accessible to everyone.' }
  ];
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-8 text-[var(--foreground)]">About Quantum Web3</h1>
          <p className="text-xl text-[var(--muted)] leading-relaxed mb-12">
            Founded in 2024, Quantum Web3 combines cutting-edge blockchain technology with intuitive design to deliver a comprehensive decentralized finance solution.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div key={index} className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-[var(--foreground)]">{value.title}</h3>
              <p className="text-[var(--muted)]">{value.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Milestones</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Launch', desc: 'Platform beta released' },
              { title: 'Security Audit', desc: 'Independent audit completed' },
              { title: 'Global Access', desc: 'Users in 50+ countries' }
            ].map((m, i) => (
              <div key={i} className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{m.title}</h3>
                <p className="text-[var(--muted)]">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
