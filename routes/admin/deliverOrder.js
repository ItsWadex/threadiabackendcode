const Order = require("../../models/Order");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    let { total } = req.body;
    console.log(total);
    // Update the isDelivered field in the database
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { isDelivered: true, total } },
      { new: true } // Return the updated order
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    res.status(200).json({ status: true, data: updatedOrder });
  } catch (error) {
    console.error("Error delivering order:", error);
    res.status(400).json({ status: false, error });
  }
};
