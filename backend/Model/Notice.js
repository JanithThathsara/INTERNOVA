const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;
