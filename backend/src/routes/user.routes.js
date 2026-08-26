const router = require("express").Router();
const userController = require("../controllers/user.controller.js");
const {verifyToken, isAdmin} = require('../middlewares/authMiddleware');

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", userController.displayAllUsers);

module.exports = router;