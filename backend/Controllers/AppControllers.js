// Controllers/AppControllers.js
const Application = require("../Model/AppModel");

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

// POST /api/applications   (create)
const addApplications = async (req, res) => {
  try {

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middle: req.body.middle || "",
      address: req.body.address,
      city: req.body.city,
      phone: req.body.phone,
      email: req.body.email,
      birth: req.body.birth,
      gender: req.body.gender || "",
      education: req.body.education || "",
      joblookingfor: req.body. joblookingfor || "",
      experiences: req.body.experiences || "",
      years: req.body.years ? Number(req.body.years) : 0,
    };

    // files (if uploaded)
    if (req.files && req.files.cv && req.files.cv.length > 0) {
      data.cv = req.files.cv[0].filename;
    }
    if (req.files && req.files.certifications && req.files.certifications.length > 0) {
      data.certifications = req.files.certifications.map((f) => f.filename);
    }

    const application = new Application(data);
    await application.save();
    return res.status(201).json(application);
  } catch (err) {
    console.error("addApplications error:", err);
    return res.status(500).json({ message: "Failed to add application" });
  }
};

//GET /api/applications/:id  (read )
 
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

// PUT /api/applications/:id (update)
 
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

//DELETE /api/applications/:id  (delete )

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

module.exports = {
  getAllApplications,
  addApplications,
  getById,
  updateApplication,
  deleteApplication,
};
