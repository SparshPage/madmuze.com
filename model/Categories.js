const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CatSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  category: { type: String, required: true },

  quant: { type: Number, required: true },
});
module.exports = Category = mongoose.model("category", CatSchema);
