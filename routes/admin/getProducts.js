const Product = require("../../models/Product");

module.exports = async (req, res) => {
  try {

    const data  = await Product.find();
    res
      .status(200)
      .json({ status: true, data });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
