'use client';

export default function PrivacyPage() {
  const sections = [
    { title: 'Information We Collect', content: 'Account details, usage data, and technical information to provide the service.' },
    { title: 'How We Use Information', content: 'To operate, secure, and improve the platform, and communicate with you.' },
    { title: 'Sharing & Disclosure', content: 'We do not sell personal data. We may share with providers under strict agreements.' },
    { title: 'Security', content: 'We implement technical and organizational measures to protect data.' },
    { title: 'Data Retention', content: 'We retain data as long as necessary for the purposes outlined.' },
    { title: 'Your Rights', content: 'You may request access, correction, or deletion subject to applicable laws.' },
    { title: 'Cookies', content: 'We use cookies for essential functionality and analytics. You may control cookies in your browser.' },
    { title: 'International Transfers', content: 'Data may be processed in other jurisdictions with appropriate safeguards.' },
    { title: 'Changes', content: 'We may update this policy. Significant changes will be communicated.' },
    { title: 'Contact', content: 'Privacy questions: support@cryptoledger.com.' }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="text-5xl font-bold text-[var(--foreground)] mb-8">Privacy Policy</h1>
        <p className="text-[var(--muted)] mb-4">Your privacy is important. This policy explains how we handle your data.</p>
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
