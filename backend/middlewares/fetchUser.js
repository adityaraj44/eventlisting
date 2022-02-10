const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  // get auth header value i.e Bearer token
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    // verify token and get the user data
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = fetchUser;
