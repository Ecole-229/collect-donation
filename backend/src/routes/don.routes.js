const router = require('express').Router();
const donationController = require('../controllers/don.controller.js');
const { verifyToken } = require('../middlewares/authMiddleware.js');

router.post("/", verifyToken, donationController.createDonation);

module.exports = router;