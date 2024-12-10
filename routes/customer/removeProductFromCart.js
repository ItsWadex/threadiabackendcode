const Cart = require("../../models/Cart");

module.exports = async (req, res) => {
  try {
    const { pId } = req.params; // Product ID
    const { id } = req.auth; // Customer ID

    // Check if the item exists in the cart
    const cartItem = await Cart.findOne({ pId, customerId: id });

    if (!cartItem) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found in cart" });
    }

    if (cartItem.quantity > 1) {
      // Decrease quantity if greater than 1
      await Cart.updateOne({ pId, customerId: id }, { $inc: { quantity: -1 } });
      return res
        .status(200)
        .json({ status: true, message: "Product quantity decreased" });
    } else {
      // Remove product if quantity is 1
      await Cart.deleteOne({ pId, customerId: id });
      return res
        .status(200)
        .json({ status: true, message: "Product removed from cart" });
    }
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
