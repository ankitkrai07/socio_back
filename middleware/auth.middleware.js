const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("Authtoken");
  if (!token) {
    return res.status(401).json({ message: "Provide token please!!" });
  }
  try {
    let decoded = jwt.verify(token, "masai");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Access denied, invalid token!!" });
  }
};

module.exports = { auth };
