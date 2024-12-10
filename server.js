const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
const app = express();
require("dotenv").config();

// constants
const port = process.env.PORT || 5000;
const URI = process.env.URI;

mongoose
  .connect(URI)
  .then(() => console.log("Connected to database 🚀"))
  .catch((err) => console.log("❌", err));

// Middlewares
// app.use(cors());
app.use(express.json());

// Routes
app.use("/api/customer", require("./routes/customer/index"));
app.use("/api/admin", require("./routes/admin/index"));

// Listen
app.listen(port, (err) => {
  if (err) throw err;
  console.log("server is up and running ✅");
});
