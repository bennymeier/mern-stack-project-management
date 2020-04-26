const express = require('express');

const MessageController = require("../controllers/message-controller");

const router = express.Router();

router.post('/message', MessageController.createMessage);
router.put('/message/:id', MessageController.updateMessage);
router.delete('/message/:id', MessageController.deleteMessage);
router.get('/message/:id', MessageController.getMessageById);
router.get('/messages', MessageController.getMessages);

module.exports = router;