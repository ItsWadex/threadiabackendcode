const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  pName: {
    type: String,
    required: true,
  },
  pPrice: {
    type: Number,
    required: true,
  },
  pDescription: String,
  pAvailable: {
    type: Boolean,
    default: true,
  },
  pSize: {
    type: [
      {
        size: String,
        qte: Number,
      },
    ],
  },
  pCategory: String,
  pImg: {
    type: [String],
    default:
      "https://th.bing.com/th/id/R.40c53e20205a7654b265925b406a85bf?rik=iKz%2b1qOP8EzaGQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2f9Tp%2fL5p%2f9TpL5pGnc.png&ehk=I9PCkWU7ReAnNmoxvvrvQzopv5RL37Zb0O6wchjgmiM%3d&risl=&pid=ImgRaw&r=0",
  },
});

module.exports = Product = mongoose.model("products", productSchema);
