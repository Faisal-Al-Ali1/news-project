const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.isAuthenticated = (req, res, next) => {
  let token =
    req.cookies.authToken || 
    (req.headers.authorization
      ? req.headers.authorization.split(" ")[1] 
      : null);

  console.log("Token:", token); 
  console.log("Token source:", req.cookies.authToken ? "Cookie" : "Authorization Header"); 

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded User:", decoded); 
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error); 
    return res.status(401).json({ message: "Invalid token" });
  }
};


exports.isAdmin = (req, res, next) => {
  console.log("Checking Role:", req.user.role); 

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. admin only." });
  }
  next();
};