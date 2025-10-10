const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["info", "warning", "error", "system", "status", "job"],
      required: true
    },
    message: { type: String, required: true },
    targetUser: { type: String, default: "all" },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
