const Project = require("../db/models/project-model");
const Issue = require("../db/models/issue-model");

const createProject = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a project",
    });
  }

  try {
    const project = new Project(body);
    await project.save();
    return res.status(201).json({
      success: true,
      data: project,
      message: "Project created!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.errmsg,
      message: "Project not created!",
    });
  }
};

const updateProject = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    await Project.updateOne({ _id: req.params.id }, body);
    return res.status(200).json({
      success: true,
      message: "Project updated!",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
      message: "Project not updated!",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: `Project not found` });
    }
    await Issue.deleteMany({ projectId: req.params.id });
    return res.status(200).json({ success: true, id: project._id });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getProjectByKey = async (req, res) => {
  try {
    const project = await Project.findOne({ key: req.params.key });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: `Project not found` });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjectByKey,
  getProjects,
};
