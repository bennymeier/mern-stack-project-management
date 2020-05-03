const express = require("express");
const verifyToken = require("../db/verifyToken");
const PriorityController = require("../controllers/priority-controller");

const router = express.Router();

router.post("/priority", verifyToken, PriorityController.createPriority);
router.put("/priority/:id", verifyToken, PriorityController.updatePriority);
router.delete("/priority/:id", verifyToken, PriorityController.deletePriority);
router.get("/priority/:key", verifyToken, PriorityController.getPriorityById);
router.get("/priorities", verifyToken, PriorityController.getPriorities);

module.exports = router;
