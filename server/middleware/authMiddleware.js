const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);
    const token = req.cookies.taskifyUserToken;

    if (!token) {
      return res.status(401).json({ error: "Un-authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = authMiddleware;
