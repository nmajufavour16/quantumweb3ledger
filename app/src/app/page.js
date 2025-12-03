'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Mail, Phone, CheckCircle, Network, Shield, Globe, Zap, Link2 } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const stats = [
    { number: "10000", label: "Active Users", prefix: "" },
    { number: "2", label: "Assets Tracked", prefix: "$" },
    { number: "99.9", label: "Uptime", suffix: "%" },
    { number: "Live", label: "Web3 Network", prefix: "" }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] font-sans">
      

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 animate-fade-in" style={{ "--delay": "300ms" }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-[var(--foreground)] leading-tight">
              Quantum Financial
              <span className="block mt-2 text-white">
                Web3 Ecosystem
              </span>
            </h1>
            <p className="text-[var(--muted)] mb-8 text-lg leading-relaxed">
              Experience the next evolution of finance with our Web3 platform, built on blockchain to give you complete control, protect your digital assets, eliminate third-party fraud, and go beyond the boundaries of traditional banking.
            </p>
            <div className="flex gap-4">
              <button onClick={() => router.push('/signup')} className="px-8 py-3 rounded-full bg-[var(--accent)] text-black hover:opacity-90 transition-colors font-semibold">
                Get Started
              </button>
              <button onClick={() => router.push('/secure-wallet')} className="px-8 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-white/10 transition-colors font-semibold">
                Secure Now
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-in" style={{ "--delay": "500ms" }}>
            <div className="relative bg-[var(--surface)] rounded-lg p-6 border border-[var(--border)]">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {src: '/candles.svg', alt: 'Trading Chart'},
                  {src: '/bitcoin-coin.svg', alt: 'Bitcoin'},
                  {src: '/ethereum-diamond.svg', alt: 'Ethereum'},
                  {src: '/network-nodes.svg', alt: 'Blockchain Network'}
                ].map((img, i) => (
                  <div key={i} className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]">
                    <Image src={img.src} alt={img.alt} width={160} height={100} className="w-full h-24 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-[var(--background)] border-t border-[var(--border)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center animate-fade-up" style={{ "--delay": `${i * 100}ms` }}>
                <div className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-2">
                  {stat.prefix}{stat.number}{stat.suffix}
                </div>
                <div className="text-[var(--muted)] text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-24 bg-[var(--background)] border-t border-[var(--border)]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-[var(--foreground)]">About Quantum Web3</h2>
              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                Founded in 2024, Quantum Web3 has become the go-to platform for Web3 financial ecosystem management. We combine cutting-edge blockchain technology with intuitive design to provide the most comprehensive decentralized finance solution.
              </p>
              <div className="space-y-4">
                {[
                  "Industry-leading blockchain security protocols",
                  "24/7 Expert support",
                  "Regular platform updates",
                  "Community-driven development"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--foreground)]" strokeWidth={1.5} />
                    <p className="text-[var(--muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-xl bg-[var(--surface)] p-8 border border-[var(--border)]">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-[var(--surface)] rounded-lg p-4 border border-[var(--border)]">
                      <Image src={["/bitcoin-coin.svg","/ethereum-diamond.svg","/network-nodes.svg","/candles.svg"][i-1]} alt="Gallery" width={300} height={300} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-24 border-t border-[var(--border)]" id="features">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">Core Features</h2>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
            Powerful tools designed to revolutionize your Web3 financial experience
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "DeFi Integration",
              desc: "Connect to hundreds of DeFi protocols across multiple blockchains",
              icon: Network
            },
            {
              title: "Cross-Chain Bridge",
              desc: "Seamlessly transfer assets between different blockchain networks",
              icon: Link2
            },
            {
              title: "Smart Contract Security",
              desc: "Audited smart contracts with zero-knowledge proof protection",
              icon: Shield
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:bg-white/10 transition-all duration-300 animate-fade-up"
              style={{ "--delay": `${i * 100 + 200}ms` }}
            >
              <feature.icon className="w-10 h-10 mb-4 text-[var(--foreground)]" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">{feature.title}</h3>
              <p className="text-[var(--muted)] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container mx-auto px-6 py-24 border-t border-[var(--border)]" id="pricing">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-[var(--foreground)]">Why Choose Us</h2>
          <p className="text-xl text-[var(--muted)] leading-relaxed mb-12">
            Experience the next generation of cryptocurrency management with our cutting-edge platform. We provide the tools you need to succeed in the digital asset space.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Decentralized Security",
                description: "No single point of failure with distributed ledger technology",
                icon: Shield
              },
              {
                title: "Permissionless Access",
                description: "Access financial services without traditional banking barriers",
                icon: Zap
              },
              {
                title: "Global Interoperability",
                description: "Connect with protocols and networks worldwide seamlessly",
                icon: Globe
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:bg-white/10 transition-all duration-300">
                <item.icon className="w-10 h-10 mb-4 text-[var(--foreground)] mx-auto" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">{item.title}</h3>
                <p className="text-[var(--muted)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-24 bg-[var(--background)] border-t border-[var(--border)] animate-fade-in" id="contact">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-8">Get in Touch</h2>
              <p className="text-[var(--muted)] mb-8">
                Have questions about our platform? We're here to help. Contact our team for dedicated support and solutions.
              </p>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Location", desc: "New York, NY 10012" },
                  { icon: Mail, title: "Email", desc: "support@cryptoledger.com" },
                  { icon: Phone, title: "Phone", desc: "+1 (555) 000-0000" }
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
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <button className="w-full py-3 rounded-full bg-[var(--accent)] text-black hover:opacity-90 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[var(--background)] border-t border-[var(--border)]">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4">Quantum Web3</h4>
              <p className="text-[var(--muted)]">Advanced Web3 financial ecosystem and decentralized finance platform.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[var(--muted)] hover:text-[var(--foreground)]">Features</a></li>
                <li><a href="#" className="text-[var(--muted)] hover:text-[var(--foreground)]">Pricing</a></li>
                <li><a href="#" className="text-[var(--muted)] hover:text-[var(--foreground)]">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[var(--muted)] hover:text-[var(--foreground)]">About</a></li>
                <li><a href="#" className="text-[var(--muted)] hover:text-[var(--foreground)]">Blog</a></li>
                <li><a href="#" className="text-[var(--muted)] hover:text-[var(--foreground)]">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-[var(--muted)] hover:text-[var(--foreground)]">Privacy</a></li>
                <li><a href="/terms" className="text-[var(--muted)] hover:text-[var(--foreground)]">Terms</a></li>
                <li><a href="#" className="text-[var(--muted)] hover:text-[var(--foreground)]">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[var(--border)] text-center text-[var(--muted)]">
            © 2024 Quantum Web3. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
