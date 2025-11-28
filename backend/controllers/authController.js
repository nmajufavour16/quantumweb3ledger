const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/email');
const { generateOTP } = require('../utils/helpers');

exports.signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, username, country, phoneNumber } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Initialize crypto balances
    const initialBalances = [
      { currency: 'BTC', amount: 0 },
      { currency: 'ETH', amount: 0 },
      { currency: 'XRP', amount: 0 },
      { currency: 'XLM', amount: 0 },
      { currency: 'HBAR', amount: 0 },
    ];

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await User.create({ 
      email, 
      password,
      otp: {
        code: otp,
        expiresAt: otpExpiry
      },
      isVerified: false,
      firstName,
      lastName,
      username,
      country,
      phoneNumber,
      balances: initialBalances,  // Add initial balances
      totalBalance: 0
    });

    // Send OTP via email
    await sendEmail(email, 'Your OTP Code', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');
    
    body {
      font-family: 'Lato', sans-serif;
      line-height: 1.6;
      color: #374151;
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 25px 0;
      border-bottom: 1px solid #eaeaea;
    }
    .content {
      padding: 30px 20px;
      text-align: center;
      font-family: 'Lato', sans-serif;
      font-weight: 400;
    }
    .otp-code {
      font-family: 'Poppins', sans-serif;
      font-size: 36px;
      font-weight: 600;
      letter-spacing: 8px;
      color: #1e40af;
      margin: 30px 0;
      padding: 18px 25px;
      background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%);
      border-radius: 12px;
      display: inline-block;
      box-shadow: 0 4px 6px rgba(37, 99, 235, 0.1);
      border-left: 4px solid #2563eb;
    }
    .message {
      margin-bottom: 30px;
      font-size: 16px;
    }
    .expiry {
      color: #6b7280;
      font-size: 14px;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #6b7280;
      font-size: 12px;
      border-top: 1px solid #eaeaea;
    }
    .security-notice {
      background-color: #fef9c3;
      padding: 12px;
      border-radius: 6px;
      margin-top: 30px;
      font-family: 'Lato', sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: #854d0e;
    }
    @media only screen and (max-width: 550px) {
      .container {
        width: 100%;
        border-radius: 0;
      }
      .content {
        padding: 20px 15px;
      }
      .otp-code {
        font-size: 28px;
        letter-spacing: 3px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="font-family: 'Poppins', sans-serif; font-weight: 700; color: #1a56db; margin: 0; letter-spacing: 0.5px;">QFS</h1>
      <h2 style="font-family: 'Poppins', sans-serif; font-weight: 500; color: #4b5563; margin-top: 5px;">One-Time Password</h2>
    </div>
    
    <div class="content">
      <div class="message">
        <p style="font-family: 'Lato', sans-serif; font-size: 17px; font-weight: 400;">Hello,</p>
        <p style="font-family: 'Lato', sans-serif; font-size: 17px; font-weight: 400;">Thank you for using QFS. Your one-time verification code for secure account access is ready:</p>
      </div>
      
      <div class="otp-code">${otp}</div>
      
      <p style="font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 500; color: #1f2937;">Enter this code to complete your verification process.</p>
      
      <div class="expiry" style="font-family: 'Lato', sans-serif; font-weight: 400;">This security code will expire in 10 minutes for your protection.</div>
      
      <div class="security-notice">
        <strong style="font-family: 'Poppins', sans-serif; font-weight: 600;">Security Notice:</strong> Never share this code with anyone. Our team will never ask for your OTP.
      </div>
    </div>
    
    <div class="footer">
      <p style="font-family: 'Poppins', sans-serif; font-weight: 600; color: #4b5563;">&copy; 2025 QFS. All rights reserved.</p>
      <p style="font-family: 'Lato', sans-serif;">If you didn't request this code, please ignore this email or <a href="#" style="color: #2563eb; text-decoration: none; font-weight: 600;">contact our support team</a>.</p>
    </div>
  </div>
</body>
</html>`);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        isVerified: false
      },
      token,
      message: 'OTP has been sent to your email'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        country: user.country,
        isVerified: user.isVerified
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    const resetUrl = `https://qfsledger.onrender.com/reset-password?token=${resetToken}`;
    await sendEmail(
      email,
      'Password Reset Request',
      `Click the following link to reset your password: ${resetUrl}`
    );

    res.json({ message: 'Password reset instructions sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending reset email', error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: 'Invalid reset token' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired reset token' });
  }
};
