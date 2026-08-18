const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "student_analyzer_jwt_secret_key_2026",
    { expiresIn: "30d" }
  );
};

// @desc    Register Teacher / Staff
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, department, designation, assignedClass, assignedSection, phone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Teacher account with this email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "Class Advisor",
      department: department || "Computer Science",
      designation: designation || "Assistant Professor",
      assignedClass: assignedClass || "I",
      assignedSection: assignedSection || "A",
      phone: phone || ""
    });

    res.status(201).json({
      success: true,
      message: "Teacher account registered successfully",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        designation: user.designation,
        assignedClass: user.assignedClass,
        assignedSection: user.assignedSection,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Auth User & Get Token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        designation: user.designation,
        assignedClass: user.assignedClass,
        assignedSection: user.assignedSection,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe };
