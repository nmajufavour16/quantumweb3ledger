'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '@/utils/api';
import { Shield, Lock, Mail, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await api.requestPasswordReset(email);
      toast.success('Password reset instructions sent to your email');
      router.push('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset instructions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] font-sans flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Background glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 cursor-pointer mb-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Quantum <span className="text-cyan-400">Ledger</span></span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Recover Ledger Access</h2>
          <p className="mt-2 text-sm text-slate-400">Enter your registered email to receive an encrypted reset token</p>
        </div>
        
        {/* Glass Card */}
        <div className="glass-panel rounded-3xl p-8 border-slate-800 shadow-2xl relative">
          
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
              <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Dispatch
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2" htmlFor="email">
                Registered Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                  placeholder="name@organization.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
            >
              {isLoading ? (
                <span>Dispatching Security Token...</span>
              ) : (
                <>
                  <span>Send Recovery Instructions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-400">
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
