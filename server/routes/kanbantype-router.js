const express = require("express");
const verifyToken = require("../db/verifyToken");
const KanbanTypeController = require("../controllers/kanbantype-controller");

const router = express.Router();

router.post("/kanbantype", verifyToken, KanbanTypeController.createKanbanType);
router.put(
  "/kanbantype/:id",
  verifyToken,
  KanbanTypeController.updateKanbanType
);
router.delete(
  "/kanbantype/:id",
  verifyToken,
  KanbanTypeController.deleteKanbanType
);
router.get(
  "/kanbantype/:id",
  verifyToken,
  KanbanTypeController.getKanbanTypeById
);
router.get("/kanbantypes", verifyToken, KanbanTypeController.getKanbanTypes);

module.exports = router;
