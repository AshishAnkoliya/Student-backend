const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // console.log("Headers:", req.headers);
      // console.log("Decoded User:", decoded);

      console.log("Auth Header:", req.headers.authorization);
      console.log("Decoded User:", req.user);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    console.log("User in isAdmin:", req.user);
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};

module.exports = {
  protect,
  isAdmin,
};
