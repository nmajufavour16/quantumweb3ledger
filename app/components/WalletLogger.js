'use client';

import { useEffect } from 'react';
import { api } from '@/utils/api';

const WalletLogger = () => {
  useEffect(() => {
    const fetchAndLogWallets = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.log('No authentication token found. Please log in.');
          return;
        }
        
        // Fetch wallets from the backend
        const response = await api.getWallets(token);
        
        // Log the wallets to the console
        console.log('=== USER WALLETS ===');
        console.log('Total wallets:', response.wallets.length);
        
        if (response.wallets.length === 0) {
          console.log('No wallets found for this user.');
        } else {
          response.wallets.forEach((wallet, index) => {
            console.log(`\nWallet #${index + 1}:`);
            console.log('Wallet Address:', wallet.walletAddress);
            console.log('Reference Number:', wallet.referenceNumber);
            console.log('Linked At:', new Date(wallet.linkedAt).toLocaleString());
            
            // Determine wallet type based on address format
            let walletType = 'Unknown';
            if (wallet.walletAddress) {
              const address = wallet.walletAddress.trim();
              
              if (/^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(address)) {
                walletType = 'Bitcoin';
              } else if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
                walletType = 'Ethereum';
              } else if (/^T[a-zA-Z0-9]{33}$/.test(address)) {
                walletType = 'Tron';
              } else if (/^r[0-9a-zA-Z]{24,34}$/.test(address)) {
                walletType = 'Ripple';
              } else if (/^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/.test(address)) {
                walletType = 'Dogecoin';
              } else if (/^L[a-km-zA-HJ-NP-Z1-9]{26,33}$/.test(address)) {
                walletType = 'Litecoin';
              }
            }
            
            console.log('Wallet Type:', walletType);
          });
        }
        
        console.log('\n=== END OF WALLETS ===');
      } catch (error) {
        console.error('Error fetching wallets:', error);
      }
    };
    
    // Call the function when the component mounts
    fetchAndLogWallets();
  }, []);
  
  // This component doesn't render anything visible
  return null;
};

export default WalletLogger; 