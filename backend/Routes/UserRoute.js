// UserRoute.js
const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserControllers");

router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUsers);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

// ✅ Login route
router.post("/login", UserController.loginUser);

module.exports = router;
