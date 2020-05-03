const express = require("express");
const verifyToken = require("../db/verifyToken");
const UserAvatarController = require("../controllers/user-avatar-controller");

const router = express.Router();

router.post("/avatar/:id", verifyToken, UserAvatarController.uploadAvatar);
router.put("/avatar/:id", verifyToken, UserAvatarController.updateAvatar);
router.delete("/avatar/:id", verifyToken, UserAvatarController.deleteAvatar);
router.get("/avatar/:id", verifyToken, UserAvatarController.getAvatarById);
router.get("/avatars", verifyToken, UserAvatarController.getAvatars);

module.exports = router;
