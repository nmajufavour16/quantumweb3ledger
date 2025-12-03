'use client';
import { useCountAnimation } from '../../hooks/useCountAnimation';

export default function Mission() {
  const stats = [
    { number: "10000", label: "Active Users", prefix: "" },
    { number: "2", label: "Assets Tracked", prefix: "$" },
    { number: "99.9", label: "Uptime", suffix: "%" }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Continuously pushing the boundaries of what's possible in crypto management."
    },
    {
      title: "Transparency",
      description: "Building trust through clear communication and open practices."
    },
    {
      title: "Security",
      description: "Protecting our users' assets with industry-leading security measures."
    },
    {
      title: "Accessibility",
      description: "Making crypto management accessible to everyone, everywhere."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-8 text-[var(--foreground)]">Our Mission</h1>
          <p className="text-xl text-[var(--muted)] leading-relaxed mb-12">
            We're on a mission to democratize cryptocurrency management through innovative technology and transparent solutions. Our platform empowers traders and investors to make informed decisions with confidence.
          </p>

          <div className="grid grid-cols-3 gap-8 mt-16">
            {stats.map((stat, i) => {
              const count = useCountAnimation(stat.number);
              return (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-[var(--foreground)] mb-2">
                    {stat.prefix}
                    {count.toLocaleString()}{stat.number == 2 ? 'B+' : stat.number == 10000 ? '+':''}
                    {stat.suffix}
                  </div>
                  <div className="text-[var(--muted)]">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[var(--foreground)]">What We Deliver</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Control', desc: 'Own your keys and data' },
              { title: 'Clarity', desc: 'Actionable analytics and insights' },
              { title: 'Confidence', desc: 'Security-first engineering' }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{item.title}</h3>
                <p className="text-[var(--muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-16 text-[var(--foreground)]">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-semibold mb-4 text-[var(--foreground)]">{value.title}</h3>
                <p className="text-[var(--muted)]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
