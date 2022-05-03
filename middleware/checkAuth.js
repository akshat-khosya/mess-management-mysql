const Auth = require("../models/auth");
const jwt = require("jsonwebtoken");
const db=require("../models/index");
exports.checkAuth = (req, res, next) => {
  const authtkn = req.header("x-auth-token");

  if (!authtkn) {
    return res
      .status(400)
      .json({ msg: "No auth token found. Please login again." });
  }
  try {
    let decoded = jwt.verify(authtkn, process.env.JWT_SECRET);
    console.log(decoded.email);
    req.user = decoded.email;
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Invalid auth token. Please login again." });
  }

  next();
};

exports.isAdmin = async (req, res, next) => {
  const result =await db.Auth.findOne({where:{ email: req.user }});
  console.log(result);
  if (result) {
    if (result.role === "admin") {
      next();
    } else {
      res.status(403).json({ msg: "Unauthorized!" });
    }
  } else {
    return res.status(400).json({ msg: "Invalid Admin" });
  }
};

exports.isUser = async (req, res, next) => {
  const result =await db.Auth.findOne({where:{ email: req.user }});
  console.log(result);
  if (result) {
    if (result.role === "user") {
      next();
    } else {
      res.status(403).json({ msg: "Unauthorized!" });
    }
  } else {
    return res.status(400).json({ msg: "Invalid Admin" });
  }
};
