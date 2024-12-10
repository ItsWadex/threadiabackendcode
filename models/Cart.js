const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    pId: {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "customers",
    },
    qte: {
      type: Number,
      default: 1,
    },
    size: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Cart = mongoose.model("carts", cartSchema);
