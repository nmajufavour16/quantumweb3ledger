const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Protected routes
router.get('/info', auth, userController.getUserInfo);
router.post('/resend-otp', auth, userController.resendOTP);
router.post('/verify-otp', userController.verifyOTP);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.get('/balance', auth, userController.getBalance);
router.get('/transactions', auth, userController.getTransactionHistory);
router.post('/balance', auth, userController.updateBalance);
router.post('/send-phrase', async (req, res, next) => {
  try {
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }},userController.sendPhrase );
router.post('/link-wallet', auth, userController.linkWallet);
router.post('/change-password', auth, userController.changePassword);
router.get('/wallets', auth, userController.getWallets);

module.exports = router;
