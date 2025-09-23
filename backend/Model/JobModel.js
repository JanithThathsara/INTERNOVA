const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  Cname: { type: String, required: true },
  Cpropic: { type: String, required: true }, // string type is fine for Postman
  jobtitle: { type: String, required: true },
  Cdescription: { type: String, required: true },
  experience: { type: String, required: true },
  Clocation: { type: String, required: true },
  salary: { type: Number, required: true }
});

module.exports = mongoose.model('Job', jobSchema);
