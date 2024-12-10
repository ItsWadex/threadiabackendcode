const Product = require("../../models/Product");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    let newProduct = await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: true, message: "Product deleted successfully" });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
