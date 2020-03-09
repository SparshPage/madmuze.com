var mongoose = require('mongoose');
var Product = require('./Product');

var product = new Product({
    name: 'gibson les paul',
    type: 'guitar',
    image: 'url',
    price: 1000
})

await product.save()
