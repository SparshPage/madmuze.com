var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    image: {
        type: String
    },

    price : {
        type: Number
    }
})

module.exports = Product = mongoose.model('product', ProductSchema)