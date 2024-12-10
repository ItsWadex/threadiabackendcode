const Product = require("../../models/Product");
module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    let product = await Product.findById(id);
    let newProduct = await Product.updateOne(
      { _id: id },
      {
        $set: { pAvailable: !product.pAvailable },
      },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
