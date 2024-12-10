const Order = require("../../models/Order");
const Cart = require("../../models/Cart");

module.exports = async (req, res) => {
  try {
    let { total, address } = req.body;
    const { id } = req.auth;
    const cart = await Cart.find({ customerId: id });
    const newOrder = new Order({ customerId: id, cart, address, total });
    await newOrder.save();
    await Cart.deleteMany({ customerId: id });
    res
      .status(200)
      .json({ status: true, message: "Order created  successfully" });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({
      status: false,
      error,
    });
  }
};
