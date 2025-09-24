const User = require("../Model/UserModel");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Add new user
const addUsers = async (req, res) => {
  const { companyName, companyRegisterNumber, companyAddress, companyPhone, companyCategory } = req.body;

  try {
    const user = new User({
      companyName,
      companyRegisterNumber,
      companyAddress,
      companyPhone,
      companyCategory,
    });
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Unable to add user" });
  }
};

// Get user by ID
const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Invalid ID" });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { companyName, companyRegisterNumber, companyAddress, companyPhone, companyCategory } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { companyName, companyRegisterNumber, companyAddress, companyPhone, companyCategory },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Unable to update user" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Unable to delete user" });
  }
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
