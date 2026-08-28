const express = require('express');
const projectController = require('../controllers/project.controller.js')
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware.js')

const router = express.Router();

router.post("/create", verifyToken, isAdmin, projectController.createProject);
router.get("/", projectController.getAllProjects);

module.exports = router;