const express = require("express");

const UserAvatarController = require("../controllers/user-avatar-controller");

const router = express.Router();

router.post("/avatar/:id", UserAvatarController.uploadAvatar);
router.put("/avatar/:id", UserAvatarController.updateAvatar);
router.delete("/avatar/:id", UserAvatarController.deleteAvatar);
router.get("/avatar/:id", UserAvatarController.getAvatarById);
router.get("/avatars", UserAvatarController.getAvatars);

module.exports = router;
