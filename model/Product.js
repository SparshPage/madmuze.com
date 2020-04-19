var mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  quant: {
    type: Number,
    required: true,
  },
});

module.exports = Product = mongoose.model("product", ProductSchema);
