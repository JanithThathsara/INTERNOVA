const Job = require("../Model/JobModel");

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }
    return res.status(200).json({ jobs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Add job
const addJob = async (req, res) => {
  const { Cname, Cpropic, jobtitle, Cdescription, experience, Clocation, salary } = req.body;
  try {
    const newJob = new Job({ Cname, Cpropic, jobtitle, Cdescription, experience, Clocation, salary });
    await newJob.save();
    return res.status(201).json(newJob);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get job by ID
const getById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    return res.status(200).json(job);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update job
const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: "Unable to update job post" });
    return res.status(200).json(updatedJob);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: "Unable to delete job post" });
    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllJobs, addJob, getById, updateJob, deleteJob };
