const Customer = require("../../models/Customer");
const Product = require("../../models/Product");
const Cart = require("../../models/Cart");

module.exports = async (req, res) => {
  try {
    const { pId } = req.params;
    let { size } = req.body;
    console.log(req.body);
    console.log(size);
    const { id } = req.auth;
    const existedProduct = await Cart.findOne({ pId });
    if (existedProduct) {
      await Cart.updateOne(
        {
          pId,
        },
        {
          $inc: {
            qte: 1,
          },
          $push: {
            size,
          },
        }
      );
      return res.status(204).end();
    }
    let newCart = new Cart({
      pId,
      customerId: id,
      size,
    });
    await newCart.save();
    res.status(200).json({ status: true, message: "Product added to cart" });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
