const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "gFpSW06nbuvsJburLwA0Zml97rtjdXeC";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Format header: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // user.id, user.role, dll bisa diakses di route
    next();
  });
};

module.exports = authenticateToken;
