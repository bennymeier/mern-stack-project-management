const express = require("express");

const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/users", UserController.getUsers);
router.get("/user/:email", UserController.getUserByMail);

module.exports = router;
