var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: { type: Boolean, default: false },

  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
});

module.exports = User = mongoose.model("user", UserSchema);
