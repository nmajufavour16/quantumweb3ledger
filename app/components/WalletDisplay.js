'use client';

import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { Wallet, Copy, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const WalletDisplay = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No authentication token found. Please log in.');
          setLoading(false);
          return;
        }
        
        const response = await api.getWallets(token);
        setWallets(response.wallets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wallets:', error);
        setError('Failed to fetch wallets. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchWallets();
  }, []);
  
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`${label} copied to clipboard!`);
      })
      .catch(err => {
        toast.error('Failed to copy to clipboard');
        console.error('Failed to copy: ', err);
      });
  };
  
  const getWalletType = (address) => {
    if (!address) return 'Unknown';
    
    const addr = address.trim();
    
    if (/^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(addr)) {
      return 'Bitcoin';
    } else if (/^0x[a-fA-F0-9]{40}$/.test(addr)) {
      return 'Ethereum';
    } else if (/^T[a-zA-Z0-9]{33}$/.test(addr)) {
      return 'Tron';
    } else if (/^r[0-9a-zA-Z]{24,34}$/.test(addr)) {
      return 'Ripple';
    } else if (/^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/.test(addr)) {
      return 'Dogecoin';
    } else if (/^L[a-km-zA-HJ-NP-Z1-9]{26,33}$/.test(addr)) {
      return 'Litecoin';
    }
    
    return 'Unknown';
  };
  
  const getExplorerLink = (address, type) => {
    if (!address) return '#';
    
    switch (type) {
      case 'Bitcoin':
        return `https://www.blockchain.com/explorer/addresses/btc/${address}`;
      case 'Ethereum':
        return `https://etherscan.io/address/${address}`;
      case 'Tron':
        return `https://tronscan.org/#/address/${address}`;
      case 'Ripple':
        return `https://xrpscan.com/account/${address}`;
      case 'Dogecoin':
        return `https://dogechain.info/address/${address}`;
      case 'Litecoin':
        return `https://litecoinspace.org/address/${address}`;
      default:
        return '#';
    }
  };
  
  if (loading) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2">Loading wallets...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-900/50 rounded-lg shadow-md">
        <div className="text-red-300">{error}</div>
      </div>
    );
  }
  
  if (wallets.length === 0) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg shadow-md">
        <div className="text-center text-gray-400">
          <Wallet className="mx-auto h-12 w-12 mb-2" />
          <p>No wallets found. Link a wallet to get started.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Wallets</h2>
      <div className="space-y-4">
        {wallets.map((wallet, index) => {
          const walletType = getWalletType(wallet.walletAddress);
          const explorerLink = getExplorerLink(wallet.walletAddress, walletType);
          
          return (
            <div key={index} className="border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-blue-400" />
                  <span className="font-medium">{walletType} Wallet</span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(wallet.linkedAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="mb-2">
                <div className="text-sm text-gray-400 mb-1">Wallet Address</div>
                <div className="flex items-center bg-gray-900 p-2 rounded">
                  <code className="text-xs overflow-x-auto flex-1">{wallet.walletAddress || 'No address'}</code>
                  <button 
                    onClick={() => copyToClipboard(wallet.walletAddress, 'Wallet address')}
                    className="ml-2 p-1 hover:bg-gray-700 rounded"
                    title="Copy address"
                  >
                    <Copy size={16} />
                  </button>
                  <a 
                    href={explorerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 p-1 hover:bg-gray-700 rounded"
                    title="View on explorer"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              
              {wallet.referenceNumber && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Reference Number</div>
                  <div className="flex items-center bg-gray-900 p-2 rounded">
                    <code className="text-xs overflow-x-auto flex-1">{wallet.referenceNumber}</code>
                    <button 
                      onClick={() => copyToClipboard(wallet.referenceNumber, 'Reference number')}
                      className="ml-2 p-1 hover:bg-gray-700 rounded"
                      title="Copy reference number"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WalletDisplay; 