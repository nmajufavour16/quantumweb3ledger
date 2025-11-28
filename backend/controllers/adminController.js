const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password -otp -resetPasswordToken -resetPasswordExpires')
      .sort({ createdAt: -1 });

    res.json({
      count: users.length,
      users: users.map(user => ({
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        totalBalance: user.totalBalance,
        balances: user.balances
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

exports.fundUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, currency } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find or create balance for the currency
    let balance = user.balances.find(b => b.currency === currency);
    if (!balance) {
      user.balances.push({ currency, amount: 0 });
      balance = user.balances[user.balances.length - 1];
    }

    balance.amount += parseFloat(amount);
    balance.updatedAt = Date.now();

    // Add transaction to history
    user.transactionHistory.push({
      type: 'deposit',
      amount: parseFloat(amount),
      currency,
      description: 'Admin funding',
      timestamp: Date.now()
    });

    // Update total balance
    user.totalBalance = user.balances.reduce((total, b) => total + b.amount, 0);

    await user.save();
    res.json({ message: 'User funded successfully', user });
  } catch (error) {
    console.error('Fund user error:', error);
    res.status(500).json({ message: 'Error funding user', error: error.message });
  }
};

exports.updateUserCoins = async (req, res) => {
  try {
    const { userId } = req.params;
    const { BTC, ETH, XRP } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update transaction history with new coin balances
    const lastTransaction = user.transactionHistory[user.transactionHistory.length - 1] || {};
    lastTransaction.cryptoBalances = {
      BTC: parseFloat(BTC) || 0,
      ETH: parseFloat(ETH) || 0,
      XRP: parseFloat(XRP) || 0
    };

    await user.save();
    res.json({ message: 'User coins updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user coins', error: error.message });
  }
};

exports.updateUserBalances = async (req, res) => {
  try {
    const { userId } = req.params;
    const { totalBalance, bitcoin, ethereum, ripple, stellar, hedera } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update crypto balances directly on the user
    // Find or create a BTC balance
    let btcBalance = user.balances.find(b => b.currency === 'BTC');
    if (!btcBalance) {
      user.balances.push({ currency: 'BTC', amount: 0 });
      btcBalance = user.balances[user.balances.length - 1];
    }
    btcBalance.amount = bitcoin || 0;

    // Find or create an ETH balance
    let ethBalance = user.balances.find(b => b.currency === 'ETH');
    if (!ethBalance) {
      user.balances.push({ currency: 'ETH', amount: 0 });
      ethBalance = user.balances[user.balances.length - 1];
    }
    ethBalance.amount = ethereum || 0;

    // Find or create an XRP balance
    let xrpBalance = user.balances.find(b => b.currency === 'XRP');
    if (!xrpBalance) {
      user.balances.push({ currency: 'XRP', amount: 0 });
      xrpBalance = user.balances[user.balances.length - 1];
    }
    xrpBalance.amount = ripple || 0;

    // Find or create an XLM balance
    let xlmBalance = user.balances.find(b => b.currency === 'XLM');
    if (!xlmBalance) {
      user.balances.push({ currency: 'XLM', amount: 0 });
      xlmBalance = user.balances[user.balances.length - 1];
    }
    xlmBalance.amount = stellar || 0;

    // Find or create an HBAR balance
    let hbarBalance = user.balances.find(b => b.currency === 'HBAR');
    if (!hbarBalance) {
      user.balances.push({ currency: 'HBAR', amount: 0 });
      hbarBalance = user.balances[user.balances.length - 1];
    }
    hbarBalance.amount = hedera || 0;

    // Update total balance
    user.totalBalance = totalBalance || 0;

    // Add a transaction record for the update
    user.transactionHistory.push({
      type: 'deposit',
      amount: 0,
      currency: 'SYSTEM',
      description: 'Admin balance update',
      timestamp: Date.now(),
      cryptoBalances: {
        BTC: bitcoin || 0,
        ETH: ethereum || 0,
        XRP: ripple || 0,
        XLM: stellar || 0,
        HBAR: hedera || 0,
      }
    });

    await user.save();
    res.json({ 
      message: 'Balances updated successfully', 
      user: {
        id: user._id,
        totalBalance: user.totalBalance,
        balances: user.balances
      }
    });
  } catch (error) {
    console.error('Update balances error:', error);
    res.status(500).json({ message: 'Error updating balances', error: error.message });
  }
};
