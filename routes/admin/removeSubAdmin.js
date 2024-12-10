const Admin = require("../../models/Admin");

module.exports = async (req, res) => {
  try {
    const { email } = req.body;

    const subAdmin = await Admin.findOne({ email, isSubAdmin: true });

    if (!subAdmin) {
      return res
        .status(404)
        .json({ status: false, message: "Subadmin not found" });
    }

    await Admin.deleteOne({ _id: subAdmin._id });

    res
      .status(200)
      .json({ status: true, message: "Subadmin removed successfully" });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
