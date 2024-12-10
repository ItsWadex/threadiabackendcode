const bcrypt = require("bcrypt");
const Admin = require("../../models/Admin");

module.exports = async (req, res) => {
  try {
    let { password, newPassword } = req.body;
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
        .json({ status: false, message: "Current password is incorrect" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await Admin.findByIdAndUpdate(id, { $set: { password: hashedPassword } });

    res
      .status(200)
      .json({ status: true, message: "Password updated successfully" });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
