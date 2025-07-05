const User = require("../models/user");
const bcrypt = require("bcryptjs");

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
      const hashPass = await bcrypt.hash(password,10);
      const newUser = new User({ username, email, password : hashPass });
      await newUser.save();
      return res.status(200).json({success :" Registration successful!"})
    }
  } catch (error) {
    return res.status(400).send("Internal server error!");
  }
};

module.exports = { register };
