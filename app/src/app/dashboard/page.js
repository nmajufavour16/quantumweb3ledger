'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import SendScreen from '../../../components/screens/SendScreen';
import ReceiveScreen from '../../../components/screens/ReceiveScreen';
import LinkWalletScreen from '../../../components/screens/LinkWalletScreen';
import { 
  Wallet, 
  ArrowRightCircle, 
  ArrowLeftCircle, 
  RefreshCw, 
  History, 
  Bell, 
  LogOut, 
  Menu, 
  ChevronRight, 
  ExternalLink,
  Shield,
  Activity,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  Lock,
  Zap,
  Layers,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { api } from '@/utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { checkWalletType } from '@/utils/walletUtils';

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
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    isVerified: false
  });
  const [walletState, setWalletState] = useState({
    wallets: [],
    walletTypes: {},
    loading: false,
    error: null
  });
  const [cryptoBalances, setCryptoBalances] = useState({
    bitcoin: 0,
    ethereum: 0,
    binancecoin: 0,
    solana: 0,
    ripple: 0,
    cardano: 0,
    'avalanche-2': 0,
    dogecoin: 0,
    polkadot: 0,
    'matic-network': 0,
    chainlink: 0,
    litecoin: 0
  });
  const [walletBalances, setWalletBalances] = useState({});
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);
  const [accountCryptoBalances, setAccountCryptoBalances] = useState({
    BTC: 0,
    ETH: 0,
    XRP: 0,
    XLM: 0,
    HBAR: 0
  });

  const buyOptions = [
    {
      name: 'MoonPay',
      description: 'Instant fiat on-ramp via Wire, SEPA, or Credit Card',
      url: 'https://www.moonpay.com',
      logo: 'https://cdn.brandfetch.io/id6XER0Pfn/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B'
    },
    {
      name: 'Binance',
      description: 'Deep liquidity exchange',
      url: 'https://www.binance.com',
      logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
    },
    {
      name: 'Coinbase',
      description: 'US-regulated institutional liquidity',
      url: 'https://www.coinbase.com',
      logo: 'https://cdn.brandfetch.io/idwDWo4ONQ/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B'
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
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
        setTransactions(transactionsResponse.transactions || []);
        setUserInfo({
          firstName: userResponse.firstName || '',
          lastName: userResponse.lastName || '',
          email: userResponse.email || '',
          phoneNumber: userResponse.phoneNumber || '',
          country: userResponse.country || '',
          isVerified: userResponse.isVerified || false
        });

        if (walletState.wallets.length > 0) {
          await fetchWalletBalances(walletState.wallets);
        }
      } catch (error) {
        // Silently handle
      }
    };

    fetchUserData();
  }, [router, walletState.wallets]);

  useEffect(() => {
    // Initial fetch to get baseline data quickly
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,ripple,cardano,avalanche-2,dogecoin,polkadot,matic-network,chainlink,litecoin&vs_currencies=usd&include_24h_change=true&_t=${Date.now()}`,
          { cache: 'no-store' }
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching initial market rates:', error);
      }
    };
    fetchCryptoData();

    // Set up Binance WebSocket for truly live updates
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/solusdt@ticker/xrpusdt@ticker/adausdt@ticker/avaxusdt@ticker/dogeusdt@ticker/dotusdt@ticker/maticusdt@ticker/linkusdt@ticker/ltcusdt@ticker');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const symbolMap = {
        'BTCUSDT': 'bitcoin',
        'ETHUSDT': 'ethereum',
        'BNBUSDT': 'binancecoin',
        'SOLUSDT': 'solana',
        'XRPUSDT': 'ripple',
        'ADAUSDT': 'cardano',
        'AVAXUSDT': 'avalanche-2',
        'DOGEUSDT': 'dogecoin',
        'DOTUSDT': 'polkadot',
        'MATICUSDT': 'matic-network',
        'LINKUSDT': 'chainlink',
        'LTCUSDT': 'litecoin'
      };
      
      const coinId = symbolMap[data.s];
      if (coinId) {
        setCryptoData(prev => ({
          ...prev,
          [coinId]: {
            ...prev?.[coinId],
            usd: parseFloat(data.c),
            usd_24h_change: parseFloat(data.P)
          }
        }));
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

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
    }, 1000);

    updateBalances();
  }, [cryptoData, cryptoBalances, accountCryptoBalances]);

  const fetchWalletBalances = async (wallets) => {
    setIsLoadingBalances(true);
    const balances = {};
    const aggregatedBalances = {
      bitcoin: 0,
      ethereum: 0,
      binancecoin: 0,
      solana: 0,
      ripple: 0,
      cardano: 0,
      'avalanche-2': 0,
      dogecoin: 0,
      polkadot: 0,
      'matic-network': 0,
      chainlink: 0,
      litecoin: 0
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
          
          const typeToKey = {
            'bitcoin': 'bitcoin',
            'ethereum': 'ethereum',
            'ripple': 'ripple',
            'solana': 'solana',
            'binance': 'binancecoin',
            'cardano': 'cardano',
            'avalanche': 'avalanche-2',
            'dogecoin': 'dogecoin',
            'polkadot': 'polkadot',
            'polygon': 'matic-network',
            'chainlink': 'chainlink',
            'litecoin': 'litecoin'
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

      if (cryptoData) {
        const totalValue = Object.entries(aggregatedBalances).reduce((sum, [coin, balance]) => {
          const price = cryptoData[coin]?.usd || 0;
          return sum + (balance * price);
        }, 0);

        setBalanceData(prev => ({
          ...prev,
          totalBalance: (prev?.totalBalance || 0) + totalValue
        }));
      }
      
    } catch (error) {
      console.error('Error fetching wallet balances:', error);
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
        const wallets = response.wallets || [];
        const walletTypes = {};
        
        for (const wallet of wallets) {
          if (wallet.walletAddress) {
            const typeInfo = checkWalletType(wallet.walletAddress);
            if (typeInfo) {
              walletTypes[wallet.walletAddress] = typeInfo;
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
        setWalletState(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchWallets();
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const cryptoList = [
    { name: 'Bitcoin', symbol: 'BTC', id: 'bitcoin', image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg', balance: cryptoBalances.bitcoin },
    { name: 'Ethereum', symbol: 'ETH', id: 'ethereum', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg', balance: cryptoBalances.ethereum },
    { name: 'BNB', symbol: 'BNB', id: 'binancecoin', image: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg', balance: cryptoBalances.binancecoin },
    { name: 'Solana', symbol: 'SOL', id: 'solana', image: 'https://cryptologos.cc/logos/solana-sol-logo.svg', balance: cryptoBalances.solana },
    { name: 'Ripple', symbol: 'XRP', id: 'ripple', image: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg', balance: cryptoBalances.ripple },
    { name: 'Cardano', symbol: 'ADA', id: 'cardano', image: 'https://cryptologos.cc/logos/cardano-ada-logo.svg', balance: cryptoBalances.cardano },
    { name: 'Avalanche', symbol: 'AVAX', id: 'avalanche-2', image: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg', balance: cryptoBalances['avalanche-2'] },
    { name: 'Dogecoin', symbol: 'DOGE', id: 'dogecoin', image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg', balance: cryptoBalances.dogecoin },
    { name: 'Polkadot', symbol: 'DOT', id: 'polkadot', image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg', balance: cryptoBalances.polkadot },
    { name: 'Polygon', symbol: 'MATIC', id: 'matic-network', image: 'https://cryptologos.cc/logos/polygon-matic-logo.svg', balance: cryptoBalances['matic-network'] },
    { name: 'Chainlink', symbol: 'LINK', id: 'chainlink', image: 'https://cryptologos.cc/logos/chainlink-link-logo.svg', balance: cryptoBalances.chainlink },
    { name: 'Litecoin', symbol: 'LTC', id: 'litecoin', image: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg', balance: cryptoBalances.litecoin }
  ];

  const renderCryptoBalance = (crypto) => {
    const accountBalance = parseFloat(accountCryptoBalances[crypto.symbol] || 0);
    const walletBalance = parseFloat(cryptoBalances[crypto.id] || 0);
    const totalBalance = (accountBalance + walletBalance).toFixed(6);
    const price = parseFloat(cryptoData[crypto.id]?.usd || 0);
    const usdValue = (parseFloat(totalBalance) * price).toFixed(2);
    const priceChangePercent = cryptoData[crypto.id]?.usd_24h_change?.toFixed(2) || 0;

    return (
      <div className="space-y-2 pt-2 border-t border-[var(--card-border)]">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Total Balance</p>
            <p className="text-sm font-bold text-white font-mono">
              {totalBalance} {crypto.symbol}
            </p>
            <p className="text-xs text-slate-400 font-mono">
              ≈ ${usdValue}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Price</p>
            <p className="text-xs font-bold text-white font-mono">
              ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className={`text-[11px] font-semibold ${priceChangePercent >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
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
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="solid-panel rounded-2xl p-8 max-w-2xl w-full animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--card-border)]">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Buy Crypto</h2>
                  <p className="text-xs text-slate-400">Purchase assets using fiat.</p>
                </div>
                <button 
                  onClick={() => handleTabChange('overview')}
                  className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-300 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="grid gap-3.5">
                {buyOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-[var(--background)] border border-[var(--card-border)] rounded-xl hover:border-blue-500 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={option.logo} 
                        alt={option.name} 
                        className="w-10 h-10 object-contain rounded-lg bg-white p-1"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{option.name}</h3>
                        <p className="text-xs text-slate-400">{option.description}</p>
                      </div>
                    </div>
                    <ExternalLink className="text-slate-500 group-hover:text-blue-400 transition-colors" size={18} />
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
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="solid-panel p-8 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--card-border)]">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Connected Wallets</h3>
                  <p className="text-xs text-slate-400">Manage all external hot, cold and exchange wallets</p>
                </div>
                <button 
                  onClick={() => handleTabChange('link')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-xs"
                >
                  <Wallet size={16} />
                  Link New Wallet
                </button>
              </div>
              
              {walletState.wallets.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Wallet className="text-blue-500" size={32} />
                  </div>
                  <h4 className="text-white font-bold text-base mb-1">No External Wallets Linked</h4>
                  <p className="text-slate-400 text-xs mb-6 max-w-sm mx-auto">Connect your external wallets to view balances here.</p>
                  <button 
                    onClick={() => handleTabChange('link')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors text-xs"
                  >
                    Connect Wallet
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
                        className="bg-[var(--background)] border border-[var(--card-border)] p-5 rounded-xl hover:border-blue-500 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <Wallet className="text-blue-500" size={20} />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-white font-bold text-sm truncate">{walletType || 'External Wallet'}</h4>
                            <p className="text-slate-400 text-[11px] font-mono truncate">
                              {wallet.walletAddress || 'Verified'}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 pt-3 border-t border-[var(--card-border)]">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Balance:</span>
                            {isLoadingBalances ? (
                              <span className="text-blue-400 font-mono animate-pulse">Syncing...</span>
                            ) : (
                              <span className="text-white font-bold font-mono">
                                {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {walletType}
                              </span>
                            )}
                          </div>
                          {walletBalances[wallet.walletAddress]?.lastUpdated && (
                            <div className="flex justify-between items-center text-[10px] text-slate-500">
                              <span>Last Verified:</span>
                              <span className="font-mono">{new Date(walletBalances[wallet.walletAddress].lastUpdated).toLocaleTimeString()}</span>
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
          <div className="space-y-8">
            
            {/* Wealth Overview Card */}
            <div className="solid-panel p-8 rounded-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 mb-1">
                    <Shield size={14} className="text-blue-500" /> Total Balance
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                    ${((balanceData?.totalBalance || 0) + (balanceData?.xrpBalance?.usdValue || 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h2>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-2">
                    <span className="text-emerald-500 font-medium flex items-center gap-0.5">
                      <TrendingUp size={13} /> Secured & Backed
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-emerald-500 flex items-center gap-1.5">
                    <CheckCircle2 size={13} /> Verified
                  </span>
                  {balanceData?.xrpBalance?.total > 0 && (
                    <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-blue-400">
                      XRP: {balanceData.xrpBalance.total.toFixed(2)} (${balanceData.xrpBalance.usdValue?.toFixed(2) || '0.00'})
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[var(--card-border)]">
                <button 
                  onClick={() => handleTabChange('send')}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold text-xs transition-colors"
                >
                  <ArrowUpRight size={16} />
                  <span>Send</span>
                </button>
                <button 
                  onClick={() => handleTabChange('receive')}
                  className="flex items-center justify-center gap-2 bg-[var(--background)] hover:bg-slate-800 text-white border border-[var(--card-border)] px-4 py-3 rounded-xl font-semibold text-xs transition-colors"
                >
                  <ArrowLeftCircle size={16} className="text-emerald-500" />
                  <span>Receive</span>
                </button>
                <button 
                  onClick={() => handleTabChange('buy')}
                  className="flex items-center justify-center gap-2 bg-[var(--background)] hover:bg-slate-800 text-white border border-[var(--card-border)] px-4 py-3 rounded-xl font-semibold text-xs transition-colors"
                >
                  <CreditCard size={16} className="text-blue-500" />
                  <span>Buy</span>
                </button>
                <button 
                  onClick={() => handleTabChange('link')}
                  className="flex items-center justify-center gap-2 bg-[var(--background)] hover:bg-slate-800 text-white border border-[var(--card-border)] px-4 py-3 rounded-xl font-semibold text-xs transition-colors"
                >
                  <Wallet size={16} className="text-blue-500" />
                  <span>Link Wallet</span>
                </button>
              </div>
            </div>

            {/* Market Overview Live Matrix */}
            <div className="solid-panel rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Market Prices</h3>
                  <p className="text-xs text-slate-400">Live feed from major exchanges</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <Activity size={14} className="text-blue-500 animate-pulse" />
                  <span>Live Feed</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {cryptoList.map((crypto) => (
                  <div 
                    key={crypto.id} 
                    className="bg-[var(--background)] border border-[var(--card-border)] p-4 rounded-xl hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <img 
                        src={crypto.image} 
                        alt={crypto.name} 
                        className="w-7 h-7 object-contain"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white">{crypto.name}</h4>
                        <p className="text-[10px] text-slate-400 font-mono">{crypto.symbol}</p>
                      </div>
                    </div>
                    {cryptoData && cryptoData[crypto.id] ? (
                      renderCryptoBalance(crypto)
                    ) : (
                      <div className="animate-pulse space-y-2 pt-2 border-t border-[var(--card-border)]">
                        <div className="h-4 bg-slate-800 rounded w-full" />
                        <div className="h-3 bg-slate-800 rounded w-2/3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Wallets Summary */}
            {walletState.wallets.length > 0 && (
              <div className="solid-panel rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Active Connected Wallets</h3>
                    <p className="text-xs text-slate-400">External wallets linked to your account</p>
                  </div>
                  <button 
                    onClick={() => handleTabChange('wallets')}
                    className="text-blue-500 hover:text-blue-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>View All ({walletState.wallets.length})</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {walletState.wallets.slice(0, 3).map((wallet, index) => {
                    const walletType = walletState.walletTypes[wallet.walletAddress]?.type;
                    const balance = walletBalances[wallet.walletAddress]?.balance || 0;
                    
                    return (
                      <div 
                        key={wallet.walletAddress || index} 
                        className="bg-[var(--background)] border border-[var(--card-border)] p-4 rounded-xl hover:border-blue-500 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <Wallet className="text-blue-500" size={16} />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-white font-bold text-xs truncate">{walletType || 'External Wallet'}</h4>
                            <p className="text-slate-400 text-[10px] font-mono truncate">
                              {wallet.walletAddress || 'Verified'}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-2 border-t border-[var(--card-border)]">
                          <span className="text-slate-400 text-[11px]">Balance:</span>
                          <span className="text-white font-bold font-mono">
                            {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {walletType}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-slate-100 font-sans selection:bg-blue-500/30 selection:text-white flex">
      <Toaster position="top-center" />
      
      <Sidebar 
        selectedTab={selectedTab} 
        setSelectedTab={setSelectedTab} 
      />

      <main className="flex-1 ml-64 p-8 min-h-screen overflow-y-auto">
        
        {/* Welcome Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-2xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Session Verified
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome, {userInfo.firstName || 'User'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              QFS Ledger • <span className="font-mono">{userInfo.email}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs px-3.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 ${
              userInfo.isVerified 
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                : 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400'
            }`}>
              <CheckCircle2 size={14} />
              {userInfo.isVerified ? 'Verified Account' : 'Standard Account'}
            </span>
          </div>
        </header>

        {renderScreen()}
      </main>
    </div>
  );
}
