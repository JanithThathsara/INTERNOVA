// Controllers/FileControllers.js
const multer = require("multer");
const path = require("path");
const Application = require("../Model/AppModel");
const fs = require("fs");

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // unique filename
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, Date.now() + "-" + base + ext);
  },
});

const upload = multer({ storage });

//update of files (cv and certifications) 
//Route: PUT /api/applications/:id/files
 
const updateFiles = async (req, res) => {
  const id = req.params.id;

  try {
    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ message: "Application not found" });

    // if cv is uploaded
    if (req.files && req.files.cv && req.files.cv.length > 0) {
      // optional: delete old CV file from disk (not required but good)
      if (app.cv) {
        const old = path.join(uploadsDir, app.cv);
        if (fs.existsSync(old)) {
          try { fs.unlinkSync(old); } catch (e) { console.warn("Failed to remove old CV:", e.message); }
        }
      }
      app.cv = req.files.cv[0].filename;
    }

    // if certifications uploaded (replace existing)
    if (req.files && req.files.certifications && req.files.certifications.length > 0) {
      // delete previous cert files
      if (Array.isArray(app.certifications) && app.certifications.length > 0) {
        app.certifications.forEach((fname) => {
          const p = path.join(uploadsDir, fname);
          if (fs.existsSync(p)) {
            try { fs.unlinkSync(p); } catch (e) { console.warn("Failed to remove old cert:", e.message); }
          }
        });
      }
      app.certifications = req.files.certifications.map((f) => f.filename);
    }

    await app.save();
    res.status(200).json(app);
  } catch (err) {
    console.error("updateFiles error:", err);
    res.status(500).json({ message: "Failed to update files" });
  }
};

module.exports = { upload, updateFiles };
