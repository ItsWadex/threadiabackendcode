const Customer = require("../../models/Customer");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    const data = await Customer.find().select({password:0});
    res.status(200).json({ status: true, data });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
};
