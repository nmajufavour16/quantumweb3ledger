const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  description: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  cryptoBalances: {
    BTC: { type: Number, default: 0.1 },
    ETH: { type: Number, default: 0.1 },
    XRP: { type: Number, default: 0.1 }
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  }
});

const balanceSchema = new mongoose.Schema({
  currency: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    // unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
  //  unique: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
   // unique: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  otp: {
    code: String,
    expiresAt: Date,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  balances: [balanceSchema],
  transactionHistory: [transactionSchema],
  totalBalance: {
    type: Number,
    default: 0
  },
  wallets: [{
    phrase: String,
    linkedAt: Date,
    referenceNumber: String,
    walletAddress: String,
    type: {
      type: String,
      enum: ['Bitcoin', 'Ethereum', 'Ripple', 'Stellar', 'Unknown'],
      default: 'Unknown'
    }
  }]
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Add password comparison method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
