'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { BarChart3, FileText, Lock, MapPin, Mail, Phone, CheckCircle, Menu, X, Wallet, Search } from "lucide-react";
import { useCountAnimation } from '../hooks/useCountAnimation';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletType, setWalletType] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');
  const [walletData, setWalletData] = useState(null);

  const stats = [
    { number: "10000", label: "Active Users", prefix: "" },
    { number: "2", label: "Assets Tracked", prefix: "$" },
    { number: "99.9", label: "Uptime", suffix: "%" }
  ];

  const checkWalletType = () => {
    setIsChecking(true);
    setError('');
    
    // Simple validation for wallet address
    if (!walletAddress.trim()) {
      setError('Please enter a wallet address');
      setIsChecking(false);
      return;
    }
    
    // Check wallet type based on address format
    // Bitcoin addresses typically start with 1, 3, or bc1
    // Ripple addresses typically start with r
    // Stellar addresses typically start with G
    
    let type = null;
    let walletInfo = null;
    
    if (walletAddress.startsWith('1') || walletAddress.startsWith('3') || walletAddress.startsWith('bc1')) {
      type = 'Bitcoin';
      walletInfo = {
        type: 'Bitcoin',
        address: walletAddress,
        format: walletAddress.startsWith('bc1') ? 'Native SegWit' : 
                walletAddress.startsWith('3') ? 'SegWit' : 'Legacy',
        timestamp: new Date().toISOString()
      };
    } else if (walletAddress.startsWith('r')) {
      type = 'Ripple';
      walletInfo = {
        type: 'Ripple',
        address: walletAddress,
        format: 'Standard',
        timestamp: new Date().toISOString()
      };
    } else if (walletAddress.startsWith('G')) {
      type = 'Stellar';
      walletInfo = {
        type: 'Stellar',
        address: walletAddress,
        format: 'Standard',
        timestamp: new Date().toISOString()
      };
    } else {
      setError('Unable to determine wallet type. Please check the address format.');
      setIsChecking(false);
      return;
    }
    
    // Log the wallet information to the console
    console.log('Wallet Type Detected:', walletInfo);
    
    setWalletType(type);
    setWalletData(walletInfo);
    setIsChecking(false);
  };

  return (
    <div className="min-h-screen bg-black font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-black/90 border-b border-white/5 animate-slide-down">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white">Quantum Security</div>
            <div className="flex items-center gap-8">
              <div className="hidden md:flex gap-6">
                <a href="#features" className="text-gray-200 hover:text-white">Features</a>
                <a href="#pricing" className="text-gray-200 hover:text-white">Pricing</a>
                <a href="/mission" className="text-gray-200 hover:text-white">Mission</a>
                <a href="#contact" className="text-gray-200 hover:text-white">Contact</a>
              </div>
              <div className="hidden md:flex gap-4">
                <button onClick={() => router.push('/login')} className="px-4 py-2 text-sm rounded-full text-white hover:bg-white/10 transition-colors">
                  Sign In
                </button>
                <button onClick={() => router.push('/signup')} className="px-4 py-2 text-sm rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
                  Sign Up
                </button>
              </div>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pt-4 pb-2">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-200 hover:text-white py-2">Features</a>
                <a href="#pricing" className="text-gray-200 hover:text-white py-2">Pricing</a>
                <a href="/mission" className="text-gray-200 hover:text-white py-2">Mission</a>
                <a href="#contact" className="text-gray-200 hover:text-white py-2">Contact</a>
                <button onClick={() => router.push('/login')} className="py-2 text-left text-gray-200 hover:text-white">
                  Sign In
                </button>
                <button onClick={() => router.push('/signup')} className="py-2 text-left text-gray-200 hover:text-white">
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 animate-fade-in" style={{ "--delay": "300ms" }}>
            <h1 className="text-4xl font-bold mb-8 text-white">
              Financial System
              <span className="block mt-2 text-white">
                Quantum Management
              </span>
            </h1>
            <p className="text-gray-300 mb-8 text-lg">
            Join the largest revolutionary financial system designed to overcome the world's banking system by eliminating cabal control of money
            </p>
            <div className="flex gap-4">
              <button onClick={() => router.push('/signup')} className="px-8 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
                Get Started
              </button>
              <button onClick={() => router.push('/secure-wallet')} className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors">
               Secure Now
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-in" style={{ "--delay": "500ms" }}>
            <div className="relative bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="h-8 w-20 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-16 bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-white">About Quantum Security</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Founded in 2024, Quantum Security has become the go-to platform for financial portfolio management. We combine cutting-edge technology with intuitive design to provide the most comprehensive tracking solution.
              </p>
              <div className="space-y-4">
                {[
                  "Industry-leading security protocols",
                  "24/7 Expert support",
                  "Regular platform updates",
                  "Community-driven development"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-xl bg-white/5 p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-4">
                      <div className="h-full w-full bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-24 border-t border-white/5" id="features">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Real-time Tracking",
              desc: "Monitor your crypto assets across multiple wallets in real-time",
              icon: BarChart3
            },
            {
              title: "Tax Reports",
              desc: "Generate comprehensive tax reports for your crypto transactions",
              icon: FileText
            },
            {
              title: "Security First",
              desc: "Bank-grade encryption and security for your sensitive data",
              icon: Lock
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-up"
              style={{ "--delay": `${i * 100 + 200}ms` }}
            >
              <feature.icon className="w-8 h-8 mb-4 text-white" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container mx-auto px-6 py-24 border-t border-white/5" id="pricing">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">Why Choose Us</h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-12">
            Experience the next generation of cryptocurrency management with our cutting-edge platform. We provide the tools you need to succeed in the digital asset space.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Advanced Security",
                description: "Military-grade encryption and multi-layer security protocols"
              },
              {
                title: "Seamless Integration",
                description: "Connect with multiple wallets and exchanges effortlessly"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock expert assistance for all your needs"
              }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wallet Type Checker Section */}
      {/* <div className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">Check Your Wallet Type</h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-12">
              Enter your wallet address to determine if it's a Bitcoin, Ripple, or Stellar wallet.
            </p>
            
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter your wallet address..."
                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={checkWalletType}
                  disabled={isChecking}
                  className="px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  {isChecking ? (
                    <>
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search size={18} />
                      Check Wallet
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                  {error}
                </div>
              )}
              
              {walletType && (
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Wallet size={24} className="text-green-400" />
                    <h3 className="text-xl font-semibold text-white">Wallet Type Detected</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-400 mb-2">{walletType}</p>
                  <p className="text-gray-400">
                    This appears to be a {walletType} wallet address. 
                    {walletType === 'Bitcoin' && ' Bitcoin addresses typically start with 1, 3, or bc1.'}
                    {walletType === 'Ripple' && ' Ripple addresses typically start with r.'}
                    {walletType === 'Stellar' && ' Stellar addresses typically start with G.'}
                  </p>
                  
                  {walletData && (
                    <div className="mt-4 p-4 bg-white/5 rounded-lg text-left">
                      <h4 className="text-white font-medium mb-2">Wallet Details:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-400">Type:</div>
                        <div className="text-white">{walletData.type}</div>
                        <div className="text-gray-400">Format:</div>
                        <div className="text-white">{walletData.format}</div>
                        <div className="text-gray-400">Address:</div>
                        <div className="text-white font-mono text-xs break-all">{walletData.address}</div>
                        <div className="text-gray-400">Detected:</div>
                        <div className="text-white">{new Date(walletData.timestamp).toLocaleString()}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}

      {/* Contact Section */}
      <div className="py-24 bg-white border-t border-gray-100 animate-fade-in" id="contact">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our platform? We're here to help. Contact our team for dedicated support and solutions.
              </p>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Location", desc: "New York, NY 10012" },
                  { icon: Mail, title: "Email", desc: "support@cryptoledger.com" },
                  { icon: Phone, title: "Phone", desc: "+1 (555) 000-0000" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <item.icon className="w-6 h-6 text-black" strokeWidth={1.5} />
                    <div>
                      <h3 className="font-semibold text-black">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
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
                  className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button className="w-full py-3 rounded-full bg-black text-white hover:bg-gray-900 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quantum Security</h4>
              <p className="text-gray-400">Advanced financial portfolio tracking and management system.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-400">
            © 2024 Quantum Security. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
