const express = require("express");
const verifyToken = require("../db/verifyToken");
const RoomController = require("../controllers/room-controller");

const router = express.Router();

router.post("/room", verifyToken, RoomController.createRoom);
router.put("/room/:id", verifyToken, RoomController.updateRoom);
router.delete("/room/:id", verifyToken, RoomController.deleteRoom);
router.get("/room/:id", verifyToken, RoomController.getRoomById);
router.get("/rooms", verifyToken, RoomController.getRooms);

module.exports = router;
