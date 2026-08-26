'use client';
import { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { Shield, Lock, KeyRound, ArrowRight, RotateCw, CheckCircle2 } from 'lucide-react';

function OTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email not found. Please try signing up again.');
      return;
    }

    try {
      setIsLoading(true);
      const otpString = otp.join('');
      await api.verifyOTP(email, otpString);
      toast.success('Ledger identity verified successfully!');
      router.push('/login');
    } catch (error) {
      toast.error(error.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      toast.error('Email not found. Please try signing up again.');
      return;
    }

    try {
      setIsLoading(true);
      await api.resendOTP(email);
      toast.success('New cryptographic code dispatched!');
    } catch (error) {
      toast.error(error.message || 'Failed to resend code');
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
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Identity Verification</h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter the 6-digit cryptographic security code sent to <br />
            <span className="text-cyan-300 font-mono font-medium">{email || 'your email'}</span>
          </p>
        </div>
        
        {/* Glass Card */}
        <div className="glass-panel rounded-3xl p-8 border-slate-800 shadow-2xl relative">
          
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
              <Lock className="w-3.5 h-3.5" /> Time-based One-Time Token
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 10m Expiry
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 6 Digit Input */}
            <div className="flex justify-center gap-2.5 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  className="w-12 h-14 sm:w-13 sm:h-16 text-center bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-2xl font-mono font-bold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all shadow-inner"
                  disabled={isLoading}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.join('').length < 6}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
            >
              {isLoading ? (
                <span>Verifying Token...</span>
              ) : (
                <>
                  <span>Authenticate & Authorize</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-400">
                Didn't receive the verification code?{' '}
                <button 
                  type="button" 
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  <RotateCw className="w-3 h-3" /> Resend Code
                </button>
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default function OTPVerification() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030712] font-sans flex items-center justify-center p-4">
        <div className="text-slate-400 text-sm font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" /> Loading Cryptographic Environment...
        </div>
      </div>
    }>
      <OTPContent />
    </Suspense>
  );
}
