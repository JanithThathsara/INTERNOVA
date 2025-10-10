const Notice = require("../Model/Notice");
const mongoose = require("mongoose");

// Create Notice
exports.createNotice = async (req, res) => {
  try {
    const { title, content, createdBy } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const notice = await Notice.create({
      title: title.trim(),
      content: content.trim(),
      createdBy: createdBy || "Admin"
    });

    res.status(201).json(notice);
  } catch (error) {
    console.error('Create notice error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get all Notices
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    console.error('Get notices error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update Notice
exports.updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, createdBy } = req.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid notice ID" });
    }

    // Validation
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const notice = await Notice.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        content: content.trim(),
        createdBy: createdBy || "Admin"
      },
      { new: true, runValidators: true }
    );

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json(notice);
  } catch (error) {
    console.error('Update notice error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete Notice
exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid notice ID" });
    }

    const notice = await Notice.findByIdAndDelete(id);

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error('Delete notice error:', error);
    res.status(500).json({ message: error.message });
  }
};
