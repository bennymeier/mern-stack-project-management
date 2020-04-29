const express = require("express");

const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/users", UserController.getUsers);
router.get("/user/:email", UserController.getUserByMail);
router.put("/user/:email", UserController.updateUser);
router.delete("/user/:email", UserController.deleteUser);

module.exports = router;
