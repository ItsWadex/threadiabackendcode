const Product = require("../../models/Product");
module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    console.log(req.body);
    let newProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Product updated successfully",
      data: newProduct,
    });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
