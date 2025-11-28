const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const auth = require('../middleware/auth');

router.get('/', auth, portfolioController.getPortfolio);
router.post('/', auth, portfolioController.addPortfolioItem);
router.put('/:id', auth, portfolioController.updatePortfolioItem);
router.delete('/:id', auth, portfolioController.deletePortfolioItem);

module.exports = router;
