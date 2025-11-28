const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

router.use(adminAuth);  // Protect all admin routes

router.get('/users', adminController.getAllUsers);
router.put('/users/:userId/balances', adminController.updateUserBalances);
router.post('/users/:userId/fund', adminController.fundUser);

module.exports = router;
