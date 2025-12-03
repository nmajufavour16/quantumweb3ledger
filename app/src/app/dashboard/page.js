'use client';
import { useState, useEffect } from 'react';
import SendScreen from '../../../components/screens/SendScreen';
import ReceiveScreen from '../../../components/screens/ReceiveScreen';
import LinkWalletScreen from '../../../components/screens/LinkWalletScreen';
import { Wallet, ArrowRightCircle, ArrowLeftCircle, RefreshCw, History, Bell, HeadphonesIcon, LogOut, Menu, Languages, ChevronDown, ChevronLeft, ExternalLink, ChevronRight } from 'lucide-react';
import { api } from '@/utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { checkWalletType } from '@/utils/walletUtils';

// Add this helper function at the top level of the component
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default function Dashboard() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balanceData, setBalanceData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    isVerified: false
  });
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [walletState, setWalletState] = useState({
    wallets: [],
    walletTypes: {},
    loading: false,
    error: null
  });
  const [cryptoBalances, setCryptoBalances] = useState({
    bitcoin: 0,
    ripple: 0,
    stellar: 0,
    ethereum: 0,
    'shiba-inu': 0,
    'hedera-hashgraph': 0
  });
  const [walletBalances, setWalletBalances] = useState({});
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);
  const [totalCryptoBalance, setTotalCryptoBalance] = useState(0);
  const [accountCryptoBalances, setAccountCryptoBalances] = useState({
    BTC: 0,
    ETH: 0,
    XRP: 0,
    XLM: 0,
    HBAR: 0
  });

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'send', label: 'Send' },
    { id: 'receive', label: 'Receive' },
    { id: 'buy', label: 'Buy' },
    { id: 'wallets', label: 'Wallets' }
  ];

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const [balanceResponse, transactionsResponse, userResponse] = await Promise.all([
        api.getBalance(token),
        api.getTransactions(token),
        api.getUser(token)
      ]);

      const accountBalances = {
        BTC: parseFloat(balanceResponse.balances?.find(b => b.currency === 'BTC')?.amount || 0),
        ETH: parseFloat(balanceResponse.balances?.find(b => b.currency === 'ETH')?.amount || 0),
        XRP: parseFloat(balanceResponse.balances?.find(b => b.currency === 'XRP')?.amount || 0),
        XLM: parseFloat(balanceResponse.balances?.find(b => b.currency === 'XLM')?.amount || 0),
        HBAR: parseFloat(balanceResponse.balances?.find(b => b.currency === 'HBAR')?.amount || 0),
      };

      setAccountCryptoBalances(accountBalances);
      setBalanceData(balanceResponse);
      setTransactions(transactionsResponse.transactions);
      setUserInfo(prev => ({
        ...prev,
        firstName: userResponse.firstName,
        lastName: userResponse.lastName,
        email: userResponse.email,
        phoneNumber: userResponse.phoneNumber,
        country: userResponse.country,
        isVerified: userResponse.isVerified
      }));

      if (walletState.wallets.length > 0) {
        await fetchWalletBalances(walletState.wallets);
      }
    } catch (error) {
      // toast.error('Failed to fetch user data');
    }
  };

  const buyOptions = [
    {
      name: 'MoonPay',
      description: 'Buy crypto with credit card or bank transfer',
      url: 'https://www.moonpay.com',
      logo: 'https://cdn.brandfetch.io/id6XER0Pfn/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B'
    },
    {
      name: 'Binance',
      description: 'World\'s largest crypto exchange',
      url: 'https://www.binance.com',
      logo: 'https://cdn.brandfetch.io/id-pjrLx_q/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B'
    },
    {
      name: 'Coinbase',
      description: 'US-based trusted exchange platform',
      url: 'https://www.coinbase.com',
      logo: 'https://cdn.brandfetch.io/idwDWo4ONQ/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B'
    }
  ];

  const calculateTotalBalance = (accountBalances, walletBalances, cryptoPrices) => {
    const totalXRP = parseFloat(accountBalances.XRP || 0) + parseFloat(walletBalances.ripple || 0);
    const xrpUsdValue = totalXRP * (cryptoPrices?.ripple?.usd || 0);
    
    const otherCryptoValue = Object.entries(cryptoBalances)
      .filter(([key]) => key !== 'ripple') // Exclude XRP as we calculated it separately
      .reduce((sum, [coinId, balance]) => {
        const price = cryptoPrices[coinId]?.usd || 0;
        return sum + (balance * price);
      }, 0);

    return xrpUsdValue + otherCryptoValue;
  };

  useEffect(() => {
    fetchUserData();
  }, [router, walletState.wallets]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ripple,stellar,ethereum,shiba-inu,hedera-hashgraph&vs_currencies=usd&include_24h_change=true&include_last_updated_at=true&include_high_24h=true'
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000); // Update every 30 seconds instead of every minute
    return () => clearInterval(interval);
  }, []); // Remove unnecessary dependencies

  useEffect(() => {
    const updateBalances = debounce(() => {
      if (!cryptoData || !balanceData) return;

      const xrpAccountBalance = parseFloat(accountCryptoBalances.XRP || 0);
      const xrpWalletBalance = parseFloat(cryptoBalances.ripple || 0);
      const totalXRP = xrpAccountBalance + xrpWalletBalance;
      const xrpUsdValue = totalXRP * (cryptoData.ripple?.usd || 0);

      const newXRPBalance = {
        total: totalXRP,
        account: xrpAccountBalance,
        wallet: xrpWalletBalance,
        usdValue: xrpUsdValue
      };

      // Only update if there's a significant change
      if (
        !balanceData.xrpBalance ||
        Math.abs(balanceData.xrpBalance.usdValue - xrpUsdValue) > 0.01
      ) {
        setBalanceData(prev => ({
          ...prev,
          xrpBalance: newXRPBalance,
          lastUpdated: Date.now()
        }));
      }
    }, 1000); // 1 second debounce

    updateBalances();
  }, [cryptoData, cryptoBalances, accountCryptoBalances]);

  const fetchWalletBalances = async (wallets) => {
    setIsLoadingBalances(true);
    const balances = {};
    const aggregatedBalances = {
      bitcoin: 0,
      ripple: 0,
      stellar: 0,
      ethereum: 0,
      'shiba-inu': 0
    };
    
    try {
      for (const wallet of wallets) {
        if (wallet.walletAddress) {
          const type = wallet.type || walletState.walletTypes[wallet.walletAddress]?.type;
          if (!type) continue;

          const balance = await api.getWalletBalance(wallet.walletAddress, type);
          
          balances[wallet.walletAddress] = {
            balance,
            type,
            lastUpdated: new Date().toISOString()
          };
          
          // Map wallet types to aggregated balance keys
          const typeToKey = {
            'bitcoin': 'bitcoin',
            'ethereum': 'ethereum',
            'ripple': 'ripple',
            'stellar': 'stellar'
          };
          
          const key = typeToKey[type.toLowerCase()];
          if (key) {
            aggregatedBalances[key] += balance;
          }
        }
      }

      setWalletBalances(balances);
      setCryptoBalances(prev => ({
        ...prev,
        ...aggregatedBalances
      }));

      // Calculate combined balance
      if (cryptoData) {
        const totalValue = Object.entries(aggregatedBalances).reduce((sum, [coin, balance]) => {
          const price = cryptoData[coin]?.usd || 0;
          return sum + (balance * price);
        }, 0);

        // Update total balance including both wallet and account balances
        setBalanceData(prev => ({
          ...prev,
          totalBalance: (prev?.totalBalance || 0) + totalValue
        }));
      }
      
    } catch (error) {
      console.error('Error fetching wallet balances:', error);
      toast.error('Failed to fetch wallet balances');
    } finally {
      setIsLoadingBalances(false);
    }
  };

  useEffect(() => {
    const fetchWallets = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      setWalletState(prev => ({ ...prev, loading: true }));
      try {
        const response = await api.getWallets(token);
        console.log('Fetched wallets:', response.wallets);
        
        const wallets = response.wallets;
        const walletTypes = {};
        
        for (const wallet of wallets) {
          if (wallet.walletAddress) {
            const typeInfo = checkWalletType(wallet.walletAddress);
            if (typeInfo) {
              walletTypes[wallet.walletAddress] = typeInfo;
              console.log(`Detected wallet type for ${wallet.walletAddress}:`, typeInfo);
            }
          }
        }

        setWalletState({
          wallets,
          walletTypes,
          loading: false,
          error: null
        });

        await fetchWalletBalances(wallets);
        
      } catch (error) {
        console.error('Error in wallet fetching:', error);
        setWalletState(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
        toast.error('Failed to fetch wallets');
      }
    };

    fetchWallets();
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.tab) {
        setSelectedTab(event.state.tab);
      } else {
        setSelectedTab('overview');
      }
    };

    window.addEventListener('popstate', handlePopState);

    if (!window.history.state?.tab) {
      window.history.replaceState({ tab: 'overview' }, '');
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    window.history.pushState({ tab }, '');
  };

  const handleBack = () => {
    setSelectedTab('overview');
  };

  const cryptoList = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      id: 'bitcoin',
      image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/btc.svg',
      balance: cryptoBalances.bitcoin
    },
    {
      name: 'Ripple',
      symbol: 'XRP',
      id: 'ripple',
      image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/xrp.svg',
      balance: cryptoBalances.ripple
    },
    {
      name: 'Stellar',
      symbol: 'XLM',
      id: 'stellar',
      image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/xlm.svg',
      balance: cryptoBalances.stellar
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      id: 'ethereum',
      image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/eth.svg',
      balance: cryptoBalances.ethereum
    },
    {
      name: 'Hedera',
      symbol: 'HBAR',
      id: 'hedera-hashgraph',
      image: 'https://cryptologos.cc/logos/hedera-hbar-logo.svg',
      balance: cryptoBalances['hedera-hashgraph']
    },
    {
      name: 'Shiba Inu',
      symbol: 'SHIB',
      id: 'shiba-inu',
      image: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/shib.svg',
      balance: cryptoBalances['shiba-inu']
    }
  ];

  const renderCryptoBalance = (crypto) => {
    const accountBalance = parseFloat(accountCryptoBalances[crypto.symbol] || 0);
    const walletBalance = parseFloat(cryptoBalances[crypto.id] || 0);
    const totalBalance = (accountBalance + walletBalance).toFixed(8);
    const price = parseFloat(cryptoData[crypto.id]?.usd || 0);
    const usdValue = (parseFloat(totalBalance) * price).toFixed(2);
    const priceChangePercent = cryptoData[crypto.id]?.usd_24h_change?.toFixed(2) || 0;

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <div className="text-left">
            <p className="text-sm text-[var(--muted)]">Total Balance</p>
            <p className="text-lg font-semibold text-[var(--foreground)]">
              {totalBalance} {crypto.symbol}
            </p>
            <p className="text-sm text-[var(--muted)]">
              ≈ ${usdValue}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[var(--muted)]">Current Price</p>
            <p className="text-sm font-medium text-[var(--foreground)]">
              ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className={`text-sm ${priceChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChangePercent >= 0 ? '+' : ''}{priceChangePercent}%
            </p>
          </div>
        </div>
       
      </div>
    );
  };

  const renderScreen = () => {
    switch(selectedTab) {
      case 'send':
        return <SendScreen balance={balanceData} onSuccess={() => fetchUserData()} />;
      case 'receive':
        return <ReceiveScreen />;
      case 'buy':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 max-w-2xl w-full m-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Buy Crypto</h2>
                <button 
                  onClick={() => handleTabChange('overview')}
                  className="text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  ✕
                </button>
              </div>
              <div className="grid gap-4">
                {buyOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={option.logo} 
                        alt={option.name} 
                        className="w-12 h-12 object-contain rounded-full"
                      />
                      <div>
                        <h3 className="text-[var(--foreground)] font-medium">{option.name}</h3>
                        <p className="text-[var(--muted)] text-sm">{option.description}</p>
                      </div>
                    </div>
                    <ExternalLink className="text-[var(--muted)]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      case 'link':
        return <LinkWalletScreen />;
      case 'wallets':
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">Your Wallets</h3>
                <button 
                  onClick={() => handleTabChange('link')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all flex items-center gap-2"
                >
                  <Wallet size={18} />
                  Link New Wallet
                </button>
              </div>
              
              {walletState.wallets.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wallet className="text-blue-400" size={32} />
                  </div>
                  <h4 className="text-[var(--foreground)] font-medium text-lg mb-2">No Wallets Linked</h4>
                  <p className="text-[var(--muted)] mb-6">Link your first wallet to get started</p>
                  <button 
                    onClick={() => handleTabChange('link')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-all"
                  >
                    Link Wallet
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {walletState.wallets.map((wallet, index) => {
                    const walletType = walletState.walletTypes[wallet.walletAddress]?.type;
                    const balance = walletBalances[wallet.walletAddress]?.balance || 0;
                    
                    return (
                      <div 
                        key={wallet.walletAddress || index} 
                        className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <Wallet className="text-blue-400" size={20} />
                          </div>
                          <div>
                            <h4 className="text-[var(--foreground)] font-medium">{walletType || 'Unknown'} Wallet</h4>
                            <p className="text-[var(--muted)] text-sm truncate max-w-[200px]">
                              {wallet.walletAddress || 'No address provided'}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[var(--muted)] text-sm">Balance:</span>
                            {isLoadingBalances ? (
                              <span className="text-[var(--foreground)] font-medium animate-pulse">Loading...</span>
                            ) : (
                              <span className="text-[var(--foreground)] font-medium">
                                {balance.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 8
                                })} {walletType}
                              </span>
                            )}
                          </div>
                          {walletBalances[wallet.walletAddress]?.lastUpdated && (
                            <div className="flex justify-between items-center">
                              <span className="text-[var(--muted)] text-sm">Last Updated:</span>
                              <span className="text-[var(--muted)] text-sm">
                                {new Date(walletBalances[wallet.walletAddress].lastUpdated).toLocaleTimeString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
            <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">Total Balance</h3>
                <div className="text-right">
                  <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded-lg block mb-1">
                    ${((balanceData?.totalBalance || 0) + (balanceData?.xrpBalance?.usdValue || 0)).toFixed(2)}
                  </span>
                  {balanceData?.xrpBalance?.total > 0 && (
                    <span className="text-blue-400 text-xs bg-blue-400/10 px-2 py-1 rounded-lg">
                      XRP: {balanceData.xrpBalance.total.toFixed(2)} (${balanceData.xrpBalance.usdValue?.toFixed(2) || '0.00'})
                    </span>
                  )}
                </div>
              </div>
              <p className="text-4xl font-bold text-[var(--foreground)] mb-4">
                ${((balanceData?.totalBalance || 0) + (balanceData?.xrpBalance?.usdValue || 0)).toLocaleString()}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleTabChange('send')}
                  className="flex items-center justify-center gap-2 bg-[var(--accent)] text-black hover:opacity-90 px-4 py-2.5 rounded-xl transition-all"
                >
                  <ArrowRightCircle size={18} />
                  Send
                </button>
                <button 
                  onClick={() => handleTabChange('receive')}
                  className="flex items-center justify-center gap-2 border border-[var(--border)] text-[var(--foreground)] hover:bg-white/10 px-4 py-2.5 rounded-xl transition-all"
                >
                  <ArrowLeftCircle size={18} />
                  Receive
                </button>
                <button 
                  onClick={() => handleTabChange('buy')}
                  className="flex items-center justify-center gap-2 border border-[var(--border)] text-[var(--foreground)] hover:bg-white/10 px-4 py-2.5 rounded-xl transition-all"
                >
                  <RefreshCw size={18} />
                  Buy
                </button>
                <button 
                  onClick={() => handleTabChange('link')}
                  className="flex items-center justify-center gap-2 border border-[var(--border)] text-[var(--foreground)] hover:bg-white/10 px-4 py-2.5 rounded-xl transition-all"
                >
                  <Wallet size={18} />
                  Link Wallet
                </button>
              </div>
            </div>

            {/* Recent Transactions */}
            {/* {transactions.length > 0 && (
              <div className="mt-8 bg-white/5 rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx._id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white">{tx.type}</p>
                        <p className="text-sm text-gray-400">{new Date(tx.timestamp).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg ${tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.type === 'deposit' ? '+' : '-'}${tx.amount}
                        </p>
                        <p className="text-sm text-gray-400">{tx.currency}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        );
    }
  };

  // Mobile menu removed; use shared Navbar and tab bar

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Toaster position="top-center" />

      {/* Main Content */}
      <div className="flex-1 p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <header className="flex items-center justify-between gap-4 mb-8 bg-[var(--surface)] border border-[var(--border)] p-6 rounded-2xl backdrop-blur-sm">
            <div>
              <h1 className="text-3xl font-bold text-[var(--foreground)]">
                {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
              </h1>
              <p className="text-[var(--muted)] mt-1">Welcome back, {userInfo.firstName || 'User'}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[var(--muted)] hidden lg:block">{userInfo.email}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                userInfo.isVerified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {userInfo.isVerified ? 'Verified' : 'Unverified'}
              </span>
            </div>
          </header>

          <div className="mb-8">
            <div className="inline-flex p-1 rounded-full bg-[var(--surface)] border border-[var(--border)]">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTabChange(t.id)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedTab === t.id ? 'bg-[var(--accent)] text-black' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {renderScreen()}

          {selectedTab === 'overview' && (
            <div className="mt-8 bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-6">Market Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {cryptoList.map((crypto) => (
                  <div 
                    key={crypto.id} 
                    className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={crypto.image} 
                        alt={crypto.name}
                        className="w-8 h-8 object-contain"
                      />
                      <div>
                        <h4 className="text-[var(--foreground)] font-medium">{crypto.name}</h4>
                        <p className="text-[var(--muted)] text-sm">{crypto.symbol}</p>
                      </div>
                    </div>
                    {cryptoData && cryptoData[crypto.id] ? (
                      renderCryptoBalance(crypto)
                    ) : (
                      <div className="animate-pulse">
                        <div className="h-8 bg-[var(--surface)] rounded mb-2"></div>
                        <div className="h-4 bg-[var(--surface)] rounded w-2/3"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wallets Summary Section */}
          {selectedTab === 'overview' && walletState.wallets.length > 0 && (
            <div className="mt-8 bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">Your Wallets</h3>
                <button 
                  onClick={() => handleTabChange('wallets')}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                >
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {walletState.wallets.slice(0, 3).map((wallet, index) => {
                  const walletType = walletState.walletTypes[wallet.walletAddress]?.type;
                  const balance = walletBalances[wallet.walletAddress]?.balance || 0;
                  
                  return (
                    <div 
                      key={wallet.walletAddress || index} 
                      className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Wallet className="text-blue-400" size={20} />
                        </div>
                        <div>
                          <h4 className="text-[var(--foreground)] font-medium">{walletType || 'Unknown'} Wallet</h4>
                          <p className="text-[var(--muted)] text-sm truncate max-w-[200px]">
                            {wallet.walletAddress || 'No address provided'}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--muted)] text-sm">Balance:</span>
                          {isLoadingBalances ? (
                            <span className="text-[var(--foreground)] font-medium animate-pulse">Loading...</span>
                          ) : (
                            <span className="text-[var(--foreground)] font-medium">
                              {balance.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 8
                              })} {walletType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {walletState.wallets.length > 3 && (
                  <div 
                    className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center"
                  >
                    <button 
                      onClick={() => handleTabChange('wallets')}
                      className="text-blue-400 hover:text-blue-300 flex flex-col items-center gap-2"
                    >
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Wallet className="text-blue-400" size={20} />
                      </div>
                      <span>View {walletState.wallets.length - 3} more wallets</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
