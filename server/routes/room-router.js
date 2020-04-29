const express = require("express");

const RoomController = require("../controllers/room-controller");

const router = express.Router();

router.post("/room", RoomController.createRoom);
router.put("/room/:id", RoomController.updateRoom);
router.delete("/room/:id", RoomController.deleteRoom);
router.get("/room/:id", RoomController.getRoomById);
router.get("/rooms", RoomController.getRooms);

module.exports = router;
