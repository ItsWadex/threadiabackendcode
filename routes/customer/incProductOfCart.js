const Customer = require("../../models/Customer");
const Product = require("../../models/Product");
const Cart = require("../../models/Cart");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const newCart = await Cart.findByIdAndUpdate(
      id,
      {
        $inc: {
          qte: 1,
        },
      },
      { new: true }
    );
    res.status(200).json({ status: true, data: newCart });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
