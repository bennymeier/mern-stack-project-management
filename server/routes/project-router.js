const express = require("express");
const verifyToken = require("../db/verifyToken");
const ProjectController = require("../controllers/project-controller");

const router = express.Router();

router.post("/project", verifyToken, ProjectController.createProject);
router.put("/project/:id", verifyToken, ProjectController.updateProject);
router.delete("/project/:id", verifyToken, ProjectController.deleteProject);
router.get("/project/:key", verifyToken, ProjectController.getProjectByKey);
router.get("/projects", verifyToken, ProjectController.getProjects);

module.exports = router;
