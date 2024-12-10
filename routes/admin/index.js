const express = require("express");
const route = express.Router();
const multer = require("../../middlewares/multer");
const verify = require("../../middlewares/verifyToken");

// // register : /api/Admin/register
// route.post("/register", require("./register"));
// login : /api/admin/login
route.post("/login", require("./login"));

// products : /api/admin/products
route.get("/products", verify, require("./getProducts"));

// products : /api/admin/products/:id
route.get("/products/:id", verify, require("./singleProduct"));

// Customers : /api/admin/Customers
route.get("/Customers", verify, require("./getCustomers"));

// subAdmins : /api/admin/subAdmins
route.get("/subAdmins", verify, require("./getSubAdmins.js"));

// // addProduct : /api/admin/addProduct
route.post(
  "/addProduct",
  verify,
  multer.array("pImage", 2),
  require("./addProduct")
);
// // updateProduct : /api/admin/updateProduct/:id
route.put("/updateProduct/:id", verify, require("./updateProduct"));

// // updateAvailibility : /api/admin/updateAvailibility/:id
route.put("/updateAvailibility/:id", verify, require("./updateAvailibility"));

// // updateProductImage : /api/admin/updateProductImage/:id
route.put(
  "/updateProductImage/:id",
  verify,
  multer.array("pImage", 2),
  require("./updateProductImage")
);

// // deleteProduct : /api/admin/deleteProduct/:id
route.delete("/deleteProduct/:id", verify, require("./deleteProduct"));

// // banCustomer : /api/admin/banCustomer/:id
route.put("/banCustomer/:id", verify, require("./banCustomer"));

// // unbanCustomer : /api/admin/unbanCustomer/:id
route.put("/unbanCustomer/:id", verify, require("./unBanCustomer.js"));

// // getOrders : /api/admin/getOrders
route.get("/getOrders", verify, require("./getOrders.js"));

// // getDeliveredOrders : /api/admin/getDeliveredOrders
route.get("/getDeliveredOrders", verify, require("./getDeliveredOrders.js"));

// // confirmOrder : /api/admin/confirmOrder/:id
route.put("/confirmOrder/:id", verify, require("./confirmOrder.js"));

// // deliverOrder : /api/admin/deliverOrder/:id
route.put("/deliverOrder/:id", verify, require("./deliverOrder.js"));

// // cancelOrder : /api/admin/cancelOrder/:id
route.put("/cancelOrder/:id", verify, require("./cancelOrder.js"));

// // addSubAdmin : /api/admin/addSubAdmin
route.post("/addSubAdmin", verify, require("./addSubAdmin.js"));

// // removeSubAdmin : /api/admin/removeSubAdmin
route.delete("/removeSubAdmin", verify, require("./removeSubAdmin.js"));

// // updatePassword : /api/admin/updatePassword
route.put("/updatePassword", verify, require("./updatePassword.js"));

// // updateEmail : /api/admin/updateEmail
route.put("/updateEmail", verify, require("./updateEmail.js"));

// // updateDetails : /api/admin/updateDetails
route.put("/updateDetails", verify, require("./updateDetails.js"));

module.exports = route;
