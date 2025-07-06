const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are mandatory!!" });
    }
    if (username.length < 5) {
      return res
        .status(400)
        .json({ error: "Username must have atleast 5 characters!" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must have atleast 5 characters!" });
    }
    const checkUsers = await User.findOne({ $or: [{ email }, { username }] });
    if (checkUsers) {
      return res
        .status(400)
        .json({ error: "This Username or Email already exists!!" });
    } else {
      const hashPass = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashPass });
      await newUser.save();
      return res.status(200).json({ success: " Registration successful!" });
    }
  } catch (error) {
    return res.status(400).send("Internal server error!");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are mandatory!!" });
    }
    const checkUser = await User.findOne({ $or: [{ email }] });
    if (checkUser) {
      bcrypt.compare(password, checkUser.password, (err, data) => {
        if (data) {
          const token = jwt.sign(
            { id: checkUser._id, email: checkUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );
          res.cookie("taskifyUserToken", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          });

          return res.status(200).json({ success: "Login Successful" });
        } else {
          return res.status(400).json({ error: "Invalid credentials!!" });
        }
      });
    }
  } catch (error) {
    return res.status(400).send("Internal server error!");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("taskifyUserToken", {
      httpOnly: true,
    });
    res.json({ message: "Logged Out" });
  } catch (error) {
    return res.status(400).json({ error: "Internal Server error!" });
  }
};

const userDetails = async (req, res) => {
  try {
    const { user } = req;
    const getDetails = await User.findById(user._id)
      .populate("tasks")
      .select("-password");
    if (getDetails) {
      const allTasks = getDetails.tasks;
      let yetToStart = [];
      let inProgress = [];
      let completed = [];
      allTasks.map((item) => {
        if (item.status === "yetToStart") {
          yetToStart.push(item);
        } else if (item.status === "inProgress") {
          inProgress.push(item);
        } else {
          completed.push(item);
        }
      });
      return res
        .status(200)
        .json({
          success: "success",
          tasks: [{ yetToStart }, { inProgress }, { completed }],
        });
    }
  } catch (error) {
    return res.status(400).json({ error: "Internal Server error!" });
  }
};

module.exports = { register, login, logout, userDetails};
