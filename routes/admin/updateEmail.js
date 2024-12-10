const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    let { password, newEmail } = req.body;
    let { id } = req.auth;

    const admin = await Admin.findById(id);
    if (!admin) {
      return res
        .status(404)
        .json({ status: false, message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Password is incorrect" });
    }
    const existingAdmin = await Admin.findOne({ email: newEmail });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ status: false, message: "Email is already in use" });
    }

    await Admin.findByIdAndUpdate(id, { $set: { email: newEmail } });

    res
      .status(200)
      .json({ status: true, message: "Email updated successfully" });
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
};
