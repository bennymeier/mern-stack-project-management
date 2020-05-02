const express = require("express");

const PriorityController = require("../controllers/priority-controller");

const router = express.Router();

router.post("/priority", PriorityController.createPriority);
router.put("/priority/:id", PriorityController.updatePriority);
router.delete("/priority/:id", PriorityController.deletePriority);
router.get("/priority/:key", PriorityController.getPriorityById);
router.get("/priorities", PriorityController.getPriorities);

module.exports = router;
