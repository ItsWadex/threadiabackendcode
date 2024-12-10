const Order = require("../../models/Order");
const Product = require("../../models/Product");
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    const { cart } = order;

    for (let i = 0; i < cart.length; i++) {
      await Product.findOneAndUpdate(
        { _id: cart[i].pId, "pSize.size": cart[i].size },
        {
          $inc: {
            "pSize.$.qte": -cart[i].qte,
          },
        }
      );
    }

    await Order.findByIdAndUpdate(id, {
      $set: { isConfirmed: true, isCanceled: false, isDelivered: false },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(400).json({ status: false, error });
  }
};
