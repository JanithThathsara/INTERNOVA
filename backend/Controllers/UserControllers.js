const User = require("../Model/UserModel");
const sendEmail = require("../Utils/email");

// Random OTP generator
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Register company with OTP
const addUsers = async (req, res) => {
  const { companyName, companyRegisterNumber, companyAddress, companyPhone, companyCategory, companyEmail } = req.body;

  try {
    // generate OTP
    const otp = generateOTP();

    const user = new User({
      companyName,
      companyRegisterNumber,
      companyAddress,
      companyPhone,
      companyCategory,
      companyEmail,
      otp,
      isVerified: false,
    });

    await user.save();

    // Send OTP email with try/catch
    try {
      const info = await sendEmail(companyEmail, "OTP Verification", `Your OTP code is: ${otp}`);
      console.log("OTP send result:", info && info.messageId ? info.messageId : info);
    } catch (emailErr) {
      console.error("Error while sending OTP email:", emailErr);
      // Optionally delete the user record if email failed
      // await User.findByIdAndDelete(user._id);
      return res.status(500).json({ message: "Registered but failed to send OTP email" });
    }

    return res.status(201).json({ message: "OTP sent to email", userId: user._id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Unable to register user" });
  }
};


// ✅ Verify OTP
const verifyOTP = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp === otp) {
      user.isVerified = true;
      user.otp = null;
      await user.save();

      await sendEmail(user.companyEmail, "Registration Successful", "🎉 Your company has been successfully registered!");

      return res.status(200).json({ message: "OTP verified, registration complete!" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login
const loginUser = async (req, res) => {
  const { companyName, companyRegisterNumber } = req.body;

  try {
    const user = await User.findOne({ companyName, companyRegisterNumber });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Existing CRUD functions unchanged...
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
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

exports.addUsers = addUsers;
exports.verifyOTP = verifyOTP;
exports.loginUser = loginUser;
exports.getAllUsers = getAllUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
