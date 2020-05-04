const KanbanType = require("../db/models/kanbantype-model");

const createKanbanType = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a kanban type",
    });
  }

  try {
    const kanbanType = new KanbanType(body);
    await kanbanType.save();
    return res.status(201).json({
      success: true,
      data: kanbanType,
      message: "Kanban type created!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.errmsg,
      message: "Kanban type not created!",
    });
  }
};

const updateKanbanType = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    await KanbanType.updateOne({ _id: req.params.id }, body);
    return res.status(200).json({
      success: true,
      message: "Kanban type updated!",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
      message: "Kanban type not updated!",
    });
  }
};

const deleteKanbanType = async (req, res) => {
  try {
    const kanbanType = await KanbanType.findOneAndDelete({
      _id: req.params.id,
    });

    if (!kanbanType) {
      return res
        .status(404)
        .json({ success: false, error: `Kanban Type not found` });
    }

    return res.status(200).json({ success: true, id: kanbanType._id });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getKanbanTypeById = async (req, res) => {
  try {
    const kanbanType = await KanbanType.findOne({ _id: req.params.id });

    if (!kanbanType) {
      return res
        .status(404)
        .json({ success: false, error: `Kanban type not found` });
    }

    return res.status(200).json({ success: true, data: kanbanType });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getKanbanTypes = async (req, res) => {
  try {
    const kanbanTypes = await KanbanType.find({}).sort({ index: "asc" });
    return res.status(200).json({ success: true, data: kanbanTypes });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  createKanbanType,
  updateKanbanType,
  deleteKanbanType,
  getKanbanTypeById,
  getKanbanTypes,
};
