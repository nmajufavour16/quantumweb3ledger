"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--surface)]/90 border-b border-[var(--border)]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-[var(--foreground)]">Quantum Web3</div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6">
              <a href="/features" className="text-[var(--muted)] hover:text-[var(--foreground)]">Features</a>
              <a href="/pricing" className="text-[var(--muted)] hover:text-[var(--foreground)]">Pricing</a>
              <a href="/mission" className="text-[var(--muted)] hover:text-[var(--foreground)]">Mission</a>
              <a href="/contact" className="text-[var(--muted)] hover:text-[var(--foreground)]">Contact</a>
            </div>
            <div className="hidden md:flex gap-4">
              <button onClick={() => router.push('/login')} className="px-4 py-2 text-sm rounded-full text-[var(--foreground)] hover:bg-white/10 transition-colors">
                Sign In
              </button>
              <button onClick={() => router.push('/signup')} className="px-4 py-2 text-sm rounded-full bg-[var(--accent)] text-black hover:opacity-90 transition-colors">
                Sign Up
              </button>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col gap-4">
              <a href="/features" className="text-gray-200 hover:text-white py-2">Features</a>
              <a href="/pricing" className="text-gray-200 hover:text-white py-2">Pricing</a>
              <a href="/mission" className="text-gray-200 hover:text-white py-2">Mission</a>
              <a href="/contact" className="text-gray-200 hover:text-white py-2">Contact</a>
              <button onClick={() => router.push('/login')} className="py-2 text-left text-gray-200 hover:text-white">Sign In</button>
              <button onClick={() => router.push('/signup')} className="py-2 text-left text-gray-200 hover:text-white">Sign Up</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
