'use client';
import { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/utils/api';
import toast, { Toaster } from 'react-hot-toast';

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
      toast.success('Email verified successfully!');
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
      toast.success('OTP resent successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans flex items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="max-w-md w-full space-y-8 p-8 bg-white/5 rounded-2xl border border-white/10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Enter OTP</h2>
          <p className="mt-2 text-gray-400">We sent a code to {email}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center space-x-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                className="w-12 h-12 text-center bg-white/5 border border-white/10 rounded-lg text-white text-xl focus:outline-none focus:ring-2 focus:ring-white/20"
                disabled={isLoading}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-full bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <p className="text-center text-sm text-gray-400">
            Didn't receive code?{' '}
            <button 
              type="button" 
              onClick={handleResendOTP}
              disabled={isLoading}
              className="text-white hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resend
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function OTPVerification() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black font-sans flex items-center justify-center p-4">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <OTPContent />
    </Suspense>
  );
}
