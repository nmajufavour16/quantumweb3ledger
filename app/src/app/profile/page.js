'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { User, Mail, Phone, MapPin, Lock, ExternalLink } from 'lucide-react';

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

  const handleChangePassword = () => {
    router.push('/change-password');
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-800/50 rounded-2xl border border-white/10 backdrop-blur-sm p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Profile</h1>
              <p className="text-gray-400 mt-1">Manage your account settings</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              userInfo.isVerified 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {userInfo.isVerified ? 'Verified' : 'Unverified'}
            </span>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-white/5 rounded"></div>
              <div className="h-12 bg-white/5 rounded"></div>
              <div className="h-12 bg-white/5 rounded"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">First Name</label>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <User size={20} className="text-gray-400" />
                    <span className="text-white">{userInfo.firstName}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Last Name</label>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <User size={20} className="text-gray-400" />
                    <span className="text-white">{userInfo.lastName}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email</label>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <Mail size={20} className="text-gray-400" />
                  <span className="text-white">{userInfo.email}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Phone Number</label>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <Phone size={20} className="text-gray-400" />
                    <span className="text-white">{userInfo.phoneNumber}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Country</label>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <MapPin size={20} className="text-gray-400" />
                    <span className="text-white">{userInfo.country}</span>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="border-t border-white/10 pt-6 mt-6">
                <h2 className="text-xl font-semibold text-white mb-4">Security</h2>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock size={20} className="text-gray-400" />
                    <div>
                      <p className="text-white">Password</p>
                      <p className="text-sm text-gray-400">Change your password</p>
                    </div>
                  </div>
                  <button
                    onClick={handleChangePassword}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Update
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
