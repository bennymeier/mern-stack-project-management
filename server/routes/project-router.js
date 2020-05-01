const express = require("express");

const ProjectController = require("../controllers/project-controller");

const router = express.Router();

router.post("/project", ProjectController.createProject);
router.put("/project/:id", ProjectController.updateProject);
router.delete("/project/:id", ProjectController.deleteProject);
router.get("/project/:key", ProjectController.getProjectByKey);
router.get("/projects", ProjectController.getProjects);

module.exports = router;
