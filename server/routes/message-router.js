const express = require("express");
const verifyToken = require("../db/verifyToken");
const MessageController = require("../controllers/message-controller");

const router = express.Router();

router.post("/message", verifyToken, MessageController.createMessage);
router.put("/message/:id", verifyToken, MessageController.updateMessage);
router.delete("/message/:id", verifyToken, MessageController.deleteMessage);
router.get("/message/:id", verifyToken, MessageController.getMessageById);
router.get("/messages/:id", verifyToken, MessageController.getMessages);

module.exports = router;
