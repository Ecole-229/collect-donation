const express = require('express');
const router = express.Router();
const cartController = require('../controllers/panier.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, cartController.getCart);
router.post('/add', verifyToken, cartController.addToCart);
router.delete('/item/:projectId', verifyToken, cartController.removeCartItem);
router.post('/checkout', verifyToken, cartController.checkoutCart);

module.exports = router;