const Room = require("../db/models/room-model");

const createRoom = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a room",
    });
  }

  const room = new Room(body);

  if (!room) {
    return res.status(400).json({ success: false, error: err });
  }

  room
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: room._id,
        message: "Room created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Room not created!",
      });
    });
};

const updateRoom = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Room.findOne({ _id: req.params.id }, (err, room) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Room not found!",
      });
    }
    const { name, time, description, avatar, members } = body;
    room.name = name;
    room.time = time;
    room.description = description;
    room.avatar = avatar;
    room.members = members;
    room
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: room._id,
          message: "Room updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Room not updated!",
        });
      });
  });
};

const deleteRoom = async (req, res) => {
  await Room.findOneAndDelete({ _id: req.params.id }, (err, room) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!room) {
      return res.status(404).json({ success: false, error: `Room not found` });
    }

    return res.status(200).json({ success: true, data: room });
  }).catch((err) => console.log(err));
};

const getRoomById = async (req, res) => {
  await Room.findOne({ _id: req.params.id }, (err, room) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!room) {
      return res.status(404).json({ success: false, error: `Room not found` });
    }
    return res.status(200).json({ success: true, data: room });
  }).catch((err) => console.log(err));
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRooms,
  getRoomById,
};
