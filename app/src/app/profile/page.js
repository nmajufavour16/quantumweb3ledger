'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { User, Mail, Phone, MapPin, Lock, ArrowLeft, Shield, CheckCircle2, KeyRound, Clock, Award } from 'lucide-react';
import Link from 'next/link';

export default function Profile() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    isVerified: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const data = await api.getUser(token);
        setUserInfo({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          country: data.country || '',
          isVerified: data.isVerified || false
        });
      } catch (error) {
        toast.error('Failed to fetch user information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans pt-20 pb-16 relative overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Back Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800"
          >
            <ArrowLeft size={14} /> Back to Ledger Dashboard
          </Link>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Shield size={14} className="text-cyan-400" />
            <span>Sovereign Identity Key #9421</span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="glass-panel rounded-3xl border-slate-800 shadow-2xl p-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                  <User className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {userInfo.firstName ? `${userInfo.firstName} ${userInfo.lastName}` : 'Ledger Account'}
                </h1>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{userInfo.email || 'Encrypted Identity'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 ${
                userInfo.isVerified 
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                  : 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400'
              }`}>
                <CheckCircle2 size={14} />
                {userInfo.isVerified ? 'Cryptographically Verified' : 'Standard Tier (Unverified)'}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="py-12 space-y-4 animate-pulse">
              <div className="h-14 bg-slate-900 rounded-xl" />
              <div className="h-14 bg-slate-900 rounded-xl" />
              <div className="h-14 bg-slate-900 rounded-xl" />
            </div>
          ) : (
            <div className="py-6 space-y-6">
              
              {/* Profile Details Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">First Name</div>
                  <div className="text-sm font-medium text-white flex items-center gap-2">
                    <User size={16} className="text-slate-500" />
                    <span>{userInfo.firstName || '—'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Last Name</div>
                  <div className="text-sm font-medium text-white flex items-center gap-2">
                    <User size={16} className="text-slate-500" />
                    <span>{userInfo.lastName || '—'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Registered Email</div>
                  <div className="text-sm font-medium text-white flex items-center gap-2">
                    <Mail size={16} className="text-slate-500" />
                    <span className="truncate">{userInfo.email || '—'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Phone Number</div>
                  <div className="text-sm font-medium text-white flex items-center gap-2">
                    <Phone size={16} className="text-slate-500" />
                    <span>{userInfo.phoneNumber || '—'}</span>
                  </div>
                </div>

                <div className="sm:col-span-2 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Jurisdiction / Country</div>
                  <div className="text-sm font-medium text-white flex items-center gap-2">
                    <MapPin size={16} className="text-slate-500" />
                    <span>{userInfo.country || '—'}</span>
                  </div>
                </div>

              </div>

              {/* Security & Access Management */}
              <div className="pt-6 border-t border-slate-800/80">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                  <Lock size={16} className="text-cyan-400" /> Security & Credential Management
                </h3>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <KeyRound size={16} className="text-cyan-400" /> Master Password
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">Regularly rotate your password to ensure post-quantum protection</p>
                  </div>
                  <button
                    onClick={() => router.push('/change-password')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-all hover:scale-[1.02]"
                  >
                    Update Password
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
