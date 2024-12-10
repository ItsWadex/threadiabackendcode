const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;
    // verrify email
    const verifyEmail = await Admin.findOne({ email });
    console.log(verifyEmail);
    if (verifyEmail) {
      return res.status(401).json({
        status: false,
        message: "Email already exist, please enter another one",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newAdmin = new Admin({
      fullName,
      email,
      password: hashedPassword,
      phone,
    });
    await newAdmin.save();
    res
      .status(200)
      .json({ status: true, message: "Admin was created successfully" });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
