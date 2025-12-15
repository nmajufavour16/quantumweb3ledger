// Use local backend when running offline, or production URL when deployed
// For offline preview, this will use localhost:5000 (your local backend)
// For production, set NEXT_PUBLIC_API_URL environment variable
const API_BASE_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api')
  : 'http://localhost:5000/api'
export const api = {
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  async signup(email, password, firstName, lastName, username, country, phoneNumber) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password, firstName, lastName, username, country, phoneNumber})
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create account');
    }
    
    return data;
  },

  async getUserInfo(token) {
    const response = await fetch(`${API_BASE_URL}/user/info`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to get user info');
    return response.json();
  },

  async getUser(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/info`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Invalid token');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getBalance(token) {
    const response = await fetch(`${API_BASE_URL}/user/balance`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch balance');
    return response.json();
  },

  async getTransactions(token, page = 1, limit = 10) {
    const response = await fetch(`${API_BASE_URL}/user/transactions?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
  },

  async updateBalance(token, data) {
    const response = await fetch(`${API_BASE_URL}/user/balance`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update balance');
    return response.json();
  },

  async verifyOTP(email, otp) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  async resendOTP(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  async sendPhrase(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/send-phrase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to link wallet');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error occurred');
    }
  },

  async linkWallet(token, walletData) {
    const response = await fetch(`${API_BASE_URL}/user/link-wallet`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(walletData)
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to link wallet');
    }
    return data;
  },

  async getWallets(token) {
    const response = await fetch(`${API_BASE_URL}/user/wallets`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    // if (!response.ok) throw alert('Failed to fetch wallets');
    return response.json();
  },

  async requestPasswordReset(email) {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to request password reset');
    }
    return response.json();
  },

  async resetPassword(token, newPassword) {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, newPassword })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to reset password');
    }
    return response.json();
  },

  async getWalletBalance(address, type) {
    try {
      let apiUrl;
      switch(type.toLowerCase()) {
        case 'bitcoin':
          apiUrl = `https://blockchain.info/balance?active=${address}`;
          break;
        case 'ethereum':
          apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=MIHVS1GH3RYIR4IVXJABQ7QXDCNVYTG5TZ`;
          break;
        case 'ripple':
          apiUrl = `https://api.xrpscan.com/api/v1/account/${address}`;
          break;
        case 'stellar':
          apiUrl = `https://horizon.stellar.org/accounts/${address}`;
          break;
        default:
          throw new Error('Unsupported wallet type');
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      
      // Parse response based on blockchain type
      switch(type.toLowerCase()) {
        case 'bitcoin':
          return data[address].final_balance / 100000000; // Convert satoshis to BTC
        case 'ethereum':
          return data.result / 1e18; // Convert wei to ETH
        case 'ripple':
          return parseFloat(data.xrpBalance);
        case 'stellar':
          return parseFloat(data.balances.find(b => b.asset_type === 'native')?.balance || 0);
        default:
          return 0;
      }
    } catch (error) {
      console.error(`Error fetching ${type} balance:`, error);
      return 0;
    }
  },

  async getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async updateUserBalances(userId, balances) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/balances`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(balances)
    });
    if (!response.ok) throw new Error('Failed to update user balances');
    return response.json();
  },

  async fundUser(userId, fundingData) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/fund`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fundingData)
    });
    if (!response.ok) throw new Error('Failed to fund user');
    return response.json();
  },

  async updateUserCoins(userId, coinData) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/update-coins`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(coinData)
    });
    if (!response.ok) throw new Error('Failed to update user coins');
    return response.json();
  },
};
