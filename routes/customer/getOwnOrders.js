const Order = require("../../models/Order");

module.exports = async (req, res) => {
  try {
    const { id } = req.auth; // Assuming req.auth contains the customer ID
    // Find the orders for the logged-in customer and populate the product details in the cart
    const orders = await Order.find({ customerId: id })
      .populate("cart.pId", "pName pPrice pImg") // Populating necessary fields
      .exec();

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No orders found." });
    }

    res.status(200).json({ status: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: false, error: error.message });
  }
};
