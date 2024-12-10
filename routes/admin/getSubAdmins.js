const Admin = require("../../models/Admin");

module.exports = async (req, res) => {
  try {
    const data = await Admin.find({ isSubAdmin: true }).select({ password: 0 });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
};
