'use client';

export default function TermsPage() {
  const sections = [
    { title: 'Introduction', content: 'These Terms of Service govern your access to and use of our platform.' },
    { title: 'Use of Service', content: 'You agree to use the service in compliance with applicable laws and these terms.' },
    { title: 'Accounts', content: 'You are responsible for maintaining the confidentiality of your account credentials.' },
    { title: 'Payments', content: 'Any fees will be disclosed prior to purchase. Taxes may apply.' },
    { title: 'Prohibited Activities', content: 'Do not engage in fraud, abuse, or activities that compromise security or integrity.' },
    { title: 'Intellectual Property', content: 'All content and technology are protected by applicable IP laws.' },
    { title: 'Disclaimers', content: 'Service is provided “as is” without warranties of any kind.' },
    { title: 'Limitation of Liability', content: 'We are not liable for indirect or consequential damages.' },
    { title: 'Changes', content: 'We may update these terms. Continued use constitutes acceptance.' },
    { title: 'Contact', content: 'For questions, contact support@cryptoledger.com.' }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="text-5xl font-bold text-[var(--foreground)] mb-8">Terms of Service</h1>
        <p className="text-[var(--muted)] mb-4">Please read these terms carefully before using the platform.</p>
        <p className="text-xs text-[var(--muted)] mb-8">Last updated: 2024-12-01</p>
        <div className="space-y-8">
          {sections.map((s, i) => (
            <section key={i} className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-3">{s.title}</h2>
              <p className="text-[var(--muted)]">{s.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
