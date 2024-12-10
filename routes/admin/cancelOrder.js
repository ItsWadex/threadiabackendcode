const Order = require("../../models/Order");

module.exports = async (req, res) => {
  try {
    console.log("ok");
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, {
      $set: { isCanceled: true, isConfirmed: false },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(400).json({ status: false, error });
  }
};
