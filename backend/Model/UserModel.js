const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    companyRegisterNumber: { type: String, required: true, trim: true },
    companyAddress: { type: String, required: true, trim: true },
    companyPhone: { type: String, required: true, trim: true },
    companyCategory: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
