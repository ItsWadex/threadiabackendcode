const Customer = require("../../models/Customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res) => {
  const PKEY = process.env.PKEY;
  try {
    const { email, password } = req.body;
    const customerData = await Customer.findOne({ email });
    if (!customerData) {
      return res.status(401).json({
        status: false,
        message: "Wrong Email or password, please try again",
      });
    }
    const comparePWD = bcrypt.compareSync(password, customerData.password);
    if (!comparePWD) {
      return res.status(401).json({
        status: false,
        message: "Wrong Email or password, please try again",
      });
    }
    const token = jwt.sign({ id: customerData._id }, PKEY, { expiresIn: "7 days" });
    res.status(200).json({
      status: true,
      data: {
        token,
        isLoggedIn: true,
        isBanned: Customer.isBanned,
      },
    });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
