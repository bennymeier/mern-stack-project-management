const Issue = require("../db/models/issue-model");

const createIssue = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a issue",
    });
  }

  try {
    const issue = new Issue(body);
    await issue.save();
    return res.status(201).json({
      success: true,
      data: issue,
      message: "Issue created!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
      message: "Issue not created!",
    });
  }
};

const updateIssue = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    await Issue.updateOne({ _id: req.params.id }, body);
    return res.status(200).json({
      success: true,
      message: "Issue updated!",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
      message: "Issue not updated!",
    });
  }
};

const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findOneAndDelete({ _id: req.params.id });

    if (!issue) {
      return res.status(404).json({ success: false, error: `Issue not found` });
    }

    return res.status(200).json({ success: true, id: issue._id });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findOne({ _id: req.params.id });

    if (!issue) {
      return res.status(404).json({ success: false, error: `Issue not found` });
    }

    return res.status(200).json({ success: true, data: issue });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find({}).sort({ index: "asc" });

    if (!issues.length) {
      return res
        .status(404)
        .json({ success: false, error: `Issues not found` });
    }

    return res.status(200).json({ success: true, data: issues });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getIssuesByProjectId = async (req, res) => {
  try {
    const issues = await Issue.find({ projectId: req.params.id }).sort({
      index: "asc",
    });
    return res.status(200).json({ success: true, data: issues });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  createIssue,
  updateIssue,
  deleteIssue,
  getIssueById,
  getIssues,
  getIssuesByProjectId,
};
