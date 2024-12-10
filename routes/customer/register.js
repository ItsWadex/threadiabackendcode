const Customer = require("../../models/Customer");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const { fullName, email, password, phone, dateofBirth } = req.body;
    // verrify email
    const verifyEmail = await Customer.findOne({ email });
    console.log(verifyEmail);
    if (verifyEmail) {
      return res.status(401).json({
        status: false,
        message: "Email already exist, please enter another one",
      });
    }
    const verifyPhone = await Customer.findOne({ phone });
    console.log(verifyPhone);
    if (verifyPhone) {
      return res.status(401).json({
        status: false,
        message: "Phone already exist, please enter another one",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newCustomer = new Customer({
      fullName,
      email,
      password: hashedPassword,
      phone,
      dateofBirth,
    });
    await newCustomer.save();
    res
      .status(200)
      .json({ status: true, message: "Customer was created successfully" });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
