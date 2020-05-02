const express = require("express");

const KanbanTypeController = require("../controllers/kanbantype-controller");

const router = express.Router();

router.post("/kanbantype", KanbanTypeController.createKanbanType);
router.put("/kanbantype/:id", KanbanTypeController.updateKanbanType);
router.delete("/kanbantype/:id", KanbanTypeController.deleteKanbanType);
router.get("/kanbantype/:id", KanbanTypeController.getKanbanTypeById);
router.get("/kanbantypes", KanbanTypeController.getKanbanTypes);

module.exports = router;
