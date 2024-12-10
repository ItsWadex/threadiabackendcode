const Customer = require("../../models/Customer");
module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    let newCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        $set: { isBanned: false },
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Customer Unbanned successfully",
      data: newCustomer,
    });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
