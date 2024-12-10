const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res, next) => {
  const PKEY = process.env.PKEY;
  const { token } = req.headers;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ status: false, message: "Unotherized" });
  }
  jwt.verify(token, PKEY, (err, data) => {
    if (err) {
      return res
        .status(401)
        .json({ status: false, error: err, message: "Not Allowed" });
    }
    // console.log("data", data);

    req.auth = { id: data.id };
    next();
  });
};
