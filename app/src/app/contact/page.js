'use client';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-bold text-[var(--foreground)] mb-8">Get in Touch</h1>
            <p className="text-[var(--muted)] mb-8">
              Have questions about our platform? We're here to help. Contact our team for dedicated support and solutions.
            </p>
            <div className="space-y-6">
              {[
                { icon: MapPin, title: 'Location', desc: 'New York, NY 10012' },
                { icon: Mail, title: 'Email', desc: 'support@cryptoledger.com' },
                { icon: Phone, title: 'Phone', desc: '+1 (555) 000-0000' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <item.icon className="w-6 h-6 text-[var(--foreground)]" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">{item.title}</h3>
                    <p className="text-[var(--muted)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Support Hours</h3>
              <p className="text-[var(--muted)]">Mon–Fri, 9am–6pm EST. Avg response: under 24 hours.</p>
            </div>
          </div>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Company"
                className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <input
                type="text"
                placeholder="Subject"
                className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <button className="w-full py-3 rounded-full bg-[var(--accent)] text-black hover:opacity-90">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
