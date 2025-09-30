const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserControllers");

router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUsers);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

// Auth
router.post("/login", UserController.loginUser);
router.post("/verify-otp", UserController.verifyOTP); // ✅ New

module.exports = router;
