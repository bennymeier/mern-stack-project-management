const express = require("express");
const verifyToken = require("../db/verifyToken");
const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/users", verifyToken, UserController.getUsers);
router.get("/user/:email", verifyToken, UserController.getUserByMail);
router.put("/user/:email", verifyToken, UserController.updateUser);
router.delete("/user/:email", verifyToken, UserController.deleteUser);

module.exports = router;
