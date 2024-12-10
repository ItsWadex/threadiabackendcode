const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Admin = require("../../models/Admin");
const crypto = require("crypto");

module.exports = async (req, res) => {
  try {
    const { email, fullName, phone } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        status: false,
        message: "Admin with this email already exists",
      });
    }

    const generatedPassword = crypto.randomBytes(8).toString("hex");

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const subAdmin = new Admin({
      email,
      fullName,
      phone,
      password: hashedPassword,
      isMainAdmin: false,
      isSubAdmin: true,
    });

    await subAdmin.save();

    res.status(201).json({
      status: true,
      message: "Subadmin added successfully and email sent",
      data: {
        generatedPassword,
      },
    });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
