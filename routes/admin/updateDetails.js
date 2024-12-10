const Admin = require("../../models/Admin");

module.exports = async (req, res) => {
  try {
    let { id } = req.auth;
    console.log("Updating details for admin ID:", id);

    const newAdmin = await Admin.findByIdAndUpdate(
      id,
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Details updated successfully",
      data: newAdmin,
    });
  } catch (error) {
    if (error) throw error;

    res.status(400).json({ status: false, error });
  }
};
