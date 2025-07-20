const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); 

// ✅ Backend REGISTER controller
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are mandatory!!" });
    }

    if (username.length < 5) {
      return res
        .status(400)
        .json({ error: "Username must have at least 5 characters!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must have at least 8 characters!" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "This Username or Email already exists!" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPass });
    await newUser.save();

    return res.status(200).json({ success: "Registration successful!" });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ LOGIN controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are mandatory!!" });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ error: "Invalid credentials!!" });
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials!!" });
    }

    const token = jwt.sign(
      { id: checkUser._id, email: checkUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("taskifyUserToken", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({ success: "Login Successful" });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

// ✅ LOGOUT controller
const logout = async (req, res) => {
  try {
    res.clearCookie("taskifyUserToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.json({ message: "Logged Out" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

// ✅ Get user + their tasks
const userDetails = async (req, res) => {
  try {
    const { user } = req;

    const getDetails = await User.findById(user._id)
      .populate("tasks")
      .select("-password");

    if (!getDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    const allTasks = getDetails.tasks || [];
    let yetToStart = [];
    let inProgress = [];
    let completed = [];

    allTasks.forEach((item) => {
      if (item.status === "yetToStart") yetToStart.push(item);
      else if (item.status === "inProgress") inProgress.push(item);
      else completed.push(item);
    });

    return res.status(200).json({
      success: "Success",
      tasks: {
        yetToStart,
        inProgress,
        completed,
      },
    });
  } catch (error) {
    console.error("🔥 Error in userDetails:", error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

module.exports = { register, login, logout, userDetails };
