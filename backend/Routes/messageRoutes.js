const express = require("express");
const { sendMessage, getMessages } = require("../Controllers/messageController");

const router = express.Router();

router.post("/", sendMessage);
router.get("/", getMessages);

module.exports = router;
