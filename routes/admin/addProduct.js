const Product = require("../../models/Product");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    let { pName, pPrice, pDescription, pSize, pCategory } = req.body;
    if (req.files.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Files are required" });
    }
  
    const uploader = async (path) => await cloudinary.uploads(path, "uploads");
    let urls = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path } = req.files[i];
      const { url } = await uploader(path);
      urls.push(url);
      fs.unlinkSync(path);
    }
    let newProduct = new Product({
      pName,
      pPrice,
      pDescription,
      pSize: JSON.parse(pSize),
      pCategory,
      pImg: urls,
    });
    await newProduct.save();

    res
      .status(200)
      .json({ status: true, message: "Product added successfully" });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
