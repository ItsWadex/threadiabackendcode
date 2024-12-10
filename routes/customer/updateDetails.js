const Customer = require("../../models/Customer");

module.exports = async (req, res) => {
  try {
    let { id } = req.auth; // Assume req.auth contains authenticated user's ID
    console.log("Updating details for customer ID:", id);

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        $set: req.body, // Spread the body directly
      },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      status: true,
      message: "Details updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating details:", error);
    res.status(400).json({ status: false, error: error.message });
  }
};
