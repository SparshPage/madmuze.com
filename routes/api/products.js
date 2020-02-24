const express = require('express');
const router = express.Router();
const auth = require('../../middleware/Auth');
var User = require('../../model/User');
var Product = require('../../model/Product');
var config = require('config');
var jwt = require('jsonwebtoken');

router.get('/',async (req,res)=>{
    let product = await Product.find();
    try {
        if(!product){
            res.status(404).json({msg: 'Not Found'});
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        return res.json('this shit is fucked up nigga')
    }
    
})

module.exports = router