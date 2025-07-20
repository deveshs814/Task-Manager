const jwt = require("jsonwebtoken");
const User = require("../models/user"); // adjust path if needed

const authMiddleware = async (req, res, next) => {
  try {
    // ✅ Correct cookie key name (as set in login)
    const token = req.cookies.taskifyUserToken;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token" });
    }
    // console.log("🔥 Received cookies:", req.cookies);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.user = user; // ✅ Attach user object for routes to use
    next();
  } catch (error) {
    // console.error("Auth error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
