const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["jwt_token"];

  if (!token) {
    return res.status(403).json({"status":"0","message":"A token is required for authentication","data":""});
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({"status":"0","message":"Invalid Token","data":""});
  }
  return next();
};

module.exports = verifyToken;