const multer = require("multer");
const fs = require("fs");
const UserAvatar = require("../db/models/user-avatar-model");

const avatarDir = "files/avatars";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");

const uploadAvatar = async (req, res) => {
  const uploadFile = () => {
    return new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          reject(err);
        } else if (err) {
          reject(err);
        }
        resolve(req.file);
      });
    });
  };
  try {
    const file = await uploadFile();
    const checkDuplicate = await UserAvatar.find({
      userId: req.params.id,
    });
    if (!checkDuplicate.length) {
      const newAvatar = new UserAvatar();
      newAvatar.destination = file.destination;
      newAvatar.filename = file.filename;
      newAvatar.size = file.size;
      newAvatar.contentType = file.mimetype;
      newAvatar.userId = req.params.id;
      newAvatar
        .save()
        .then(() =>
          res
            .status(200)
            .json({ success: true, data: file, message: "Avatar updated!" })
        )
        .catch((error) =>
          res.status(400).json({
            success: false,
            error: error.message,
            message: "Avatar upload failed!",
          })
        );
    } else {
      const destination = `${file.destination}\\${file.filename}`;
      // Check if file exists on disk
      fs.stat(destination, function (err) {
        if (err) {
          return console.error(err);
        }
        // Delete file from disk
        fs.unlink(destination, function (err) {
          if (err) return console.log(err);
        });
      });
      await UserAvatar.updateOne(
        { userId: req.params.id },
        {
          destination: file.destination,
          filename: file.filename,
          size: file.size,
          contentType: file.mimetype,
        }
      );
      return res.status(200).json({
        success: true,
        data: { _id: req.params.id, ...file },
        message: "Avatar updated!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
      message: "Avatar upload failed!",
    });
  }
};

const deleteAvatar = async (req, res) => {
  try {
    const oldAvatar = await UserAvatar.findOne({ userId: req.params.id });
    if (oldAvatar) {
      const destination = `${oldAvatar.destination}\\${oldAvatar.filename}`;
      // Check if file exists on disk
      fs.stat(destination, function (err) {
        if (err) {
          return console.error(err);
        }
        // Delete file from disk
        fs.unlink(destination, function (err) {
          if (err) return console.log(err);
        });
      });
    }
    const avatar = await UserAvatar.findOneAndDelete({ userId: req.params.id });

    if (!avatar) {
      return res
        .status(404)
        .json({ success: false, message: "Avatar not found." });
    }

    return res
      .status(200)
      .json({ success: true, id: avatar._id, message: "Avatar deleted." });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error, message: "Avatar could not be deleted." });
  }
};

const updateAvatar = async (req, res) => {
  return res
    .status(400)
    .json({ success: false, message: "Route not implemented." });
};

const getAvatarById = async (req, res) => {
  return res
    .status(400)
    .json({ success: false, message: "Route not implemented." });
};
const getAvatars = async (req, res) => {
  try {
    const avatars = await UserAvatar.find({});
    return res.status(200).json({ success: true, data: avatars });
  } catch (error) {
    return res.status(400).json({ success: false, error: err });
  }
};

module.exports = {
  uploadAvatar,
  updateAvatar,
  deleteAvatar,
  getAvatarById,
  getAvatars,
};
