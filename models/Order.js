const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    cart: {
      type: [
        {
          pId: {
            type: mongoose.Types.ObjectId,
            ref: "products",
          },
          qte: Number,
          size: [String],
        },
      ],
    },
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "customers",
    },
    total: { type: Number, default: 0 },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isCanceled: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Order = mongoose.model("orders", orderSchema);
