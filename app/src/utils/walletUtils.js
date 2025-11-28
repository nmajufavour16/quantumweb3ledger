export const checkWalletType = (walletAddress) => {
  if (!walletAddress?.trim()) return null;
  
  const address = walletAddress.trim();
  const walletPatterns = {
    Bitcoin: /^(1|3|bc1)[a-zA-Z0-9]{25,39}$/,
    Ethereum: /^0x[a-fA-F0-9]{40}$/,
    Ripple: /^r[a-zA-Z0-9]{24,34}$/,
    Stellar: /^G[A-Z0-9]{55}$/,
    Tron: /^T[a-zA-Z0-9]{33}$/,
    Dogecoin: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/,
    Litecoin: /^L[a-km-zA-HJ-NP-Z1-9]{26,33}$/
  };

  for (const [type, pattern] of Object.entries(walletPatterns)) {
    if (pattern.test(address)) {
      return {
        type,
        format: type === 'Bitcoin' 
          ? address.startsWith('bc1') ? 'Native SegWit' 
          : address.startsWith('3') ? 'SegWit' 
          : 'Legacy'
          : 'Standard'
      };
    }
  }
  
  return null;
};
