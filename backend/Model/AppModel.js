// Model/AppModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    birth: { type: Date, required: true },
    gender: { type: String, default: "" },
    education: { type: String, default: "" },
    joblookingfor: { type: String, default: "" },
    experiences: { type: String, default: "" },
    years: { type: Number, default: 0 },
    cv: { type: String, default: null }, // filename stored
    certifications: [{ type: String }], // array of filenames
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", appSchema);
