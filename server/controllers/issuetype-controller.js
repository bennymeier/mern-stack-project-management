const IssueType = require("../db/models/issuetype-model");

const createIssueType = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide an IssueType",
    });
  }

  try {
    const issue = new IssueType(body);
    await issue.save();
    return res.status(201).json({
      success: true,
      data: issue,
      message: "IssueType created!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.errmsg,
      message: "IssueType not created!",
    });
  }
};

const updateIssueType = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    await IssueType.updateOne({ _id: req.params.id }, body);
    return res.status(200).json({
      success: true,
      message: "IssueType updated!",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
      message: "IssueType not updated!",
    });
  }
};

const deleteIssueType = async (req, res) => {
  try {
    const issue = await IssueType.findOneAndDelete({ _id: req.params.id });

    if (!issue) {
      return res
        .status(404)
        .json({ success: false, error: `IssueType not found` });
    }

    return res.status(200).json({ success: true, id: issue._id });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getIssueTypeById = async (req, res) => {
  try {
    const issue = await IssueType.findOne({ _id: req.params.id });

    if (!issue) {
      return res
        .status(404)
        .json({ success: false, error: `IssueType not found` });
    }

    return res.status(200).json({ success: true, data: issue });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getIssueTypes = async (req, res) => {
  try {
    const issues = await IssueType.find({});
    return res.status(200).json({ success: true, data: issues });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  createIssueType,
  updateIssueType,
  deleteIssueType,
  getIssueTypeById,
  getIssueTypes,
};
