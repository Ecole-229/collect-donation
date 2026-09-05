const express = require('express');
const projectController = require('../controllers/project.controller.js')
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware.js')

const router = express.Router();

router.delete("/:id", verifyToken, isAdmin, projectController.DeleteProject);
router.post("/create", verifyToken, isAdmin, projectController.createProject);
router.get("/:id", projectController.getOneProject);
router.get("/", projectController.getAllProjects);
router.put("/update/:id", verifyToken, isAdmin, projectController.UpdateProjectStatus);

module.exports = router;