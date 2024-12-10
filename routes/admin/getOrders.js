const Order = require("../../models/Order");

module.exports = async (req, res) => {
  try {
    const data = await Order.find().populate(
      "cart.pId customerId",
      "-password -createdAt -updatedAt"
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
