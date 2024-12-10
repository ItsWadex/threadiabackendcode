const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res) => {
  const PKEY = process.env.PKEY;
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        status: false,
        message: "Wrong Email or password, please try again",
      });
    }
    const comparePWD = bcrypt.compareSync(password, admin.password);
    if (!comparePWD) {
      return res.status(401).json({
        status: false,
        message: "Wrong Email or password, please try again",
      });
    }
    const token = jwt.sign({ id: admin._id }, PKEY, { expiresIn: "7days" });
    res.status(200).json({
      status: true,
      data: {
        token,
        isAdmin: admin.isMainAdmin,
        isSubAdmin: admin.isSubAdmin,
        isLoggedIn: true,
      },
    });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
