// Controllers/AppControllers.js
const Application = require("../Model/AppModel");
const nodemailer = require("nodemailer"); 

/**
 * GET /api/applications
 */
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    return res.status(200).json(applications);
  } catch (err) {
    console.error("getAllApplications error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/applications
 */
const addApplications = async (req, res) => {
  try {
    const { body, files } = req;

    // File Handling
    const cvFile = files?.cv ? files.cv[0].filename : null;
    const certificationFiles = files?.certifications
      ? files.certifications.map((file) => file.filename)
      : [];

    // Random Interview Scheduler
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 5) + 1; // 1–5 days later
    const interviewDateObj = new Date(today);
    interviewDateObj.setDate(today.getDate() + randomDays);

    const randomHour = 9 + Math.floor(Math.random() * 8); // 9 AM - 4 PM
    const randomMinute = ["00", "15", "30", "45"][Math.floor(Math.random() * 4)];
    const interviewTime = `${String(randomHour).padStart(2, "0")}:${randomMinute}`;

    const randomString = Math.random().toString(36).substring(2, 8);
    const interviewLink = `https://meet.google.com/${randomString}`;

    // Create new Application
    const newApplication = new Application({
      ...body,
      cv: cvFile,
      certifications: certificationFiles,
      interviewDate: interviewDateObj.toISOString().split("T")[0],
      interviewTime,
      interviewLink,
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully with interview scheduled!",
      data: newApplication,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/applications/:id
 */
const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ message: "Application not found" });
    return res.status(200).json(application);
  } catch (err) {
    console.error("getById error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/applications/:id
 */
const updateApplication = async (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    address,
    city,
    phone,
    email,
    birth,
    gender,
    education,
    joblookingfor,
    experiences,
    years,
  } = req.body;

  try {
    const updated = await Application.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        address,
        city,
        phone,
        email,
        birth,
        gender,
        education,
        joblookingfor,
        experiences,
        years,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Unable to update application" });
    return res.status(200).json(updated);
  } catch (err) {
    console.error("updateApplication error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/applications/:id
 */
const deleteApplication = async (req, res) => {
  const id = req.params.id;
  try {
    const application = await Application.findByIdAndDelete(id);
    if (!application) return res.status(404).json({ message: "Unable to delete application" });
    return res.status(200).json({ message: "Deleted", application });
  } catch (err) {
    console.error("deleteApplication error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Export all controllers in one clean object
module.exports = {
  getAllApplications,
  addApplications,
  getById,
  updateApplication,
  deleteApplication,
};
