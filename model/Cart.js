const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CartSchemea = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },

  Items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product"
      }
    }
  ],
  totalQty: {
    type: Number
  },

  total: Number
});

module.exports = Cart = mongoose.model("cart", CartSchemea);
