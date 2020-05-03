const Priority = require("../db/models/priority-model");

const createPriority = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a priority",
    });
  }

  try {
    const priority = new Priority(body);
    await priority.save();
    return res.status(201).json({
      success: true,
      data: priority,
      message: "Priority created!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.errmsg,
      message: "Priority not created!",
    });
  }
};

const updatePriority = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    await Priority.updateOne({ _id: req.params.id }, body);
    return res.status(200).json({
      success: true,
      message: "Priority updated!",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
      message: "Priority not updated!",
    });
  }
};

const deletePriority = async (req, res) => {
  try {
    const priority = await Priority.findOneAndDelete({ _id: req.params.id });

    if (!priority) {
      return res
        .status(404)
        .json({ success: false, error: `Priority not found` });
    }

    return res.status(200).json({ success: true, id: priority._id });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getPriorityById = async (req, res) => {
  try {
    const priority = await Issue.findOne({ _id: req.params.id });

    if (!priority) {
      return res
        .status(404)
        .json({ success: false, error: `Priority not found` });
    }

    return res.status(200).json({ success: true, data: priority });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getPriorities = async (req, res) => {
  try {
    const priorities = await Priority.find({});
    return res.status(200).json({ success: true, data: priorities });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  createPriority,
  updatePriority,
  deletePriority,
  getPriorityById,
  getPriorities,
};
