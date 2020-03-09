const express = require('express');
const router = express.Router();
const auth = require('../../middleware/Auth');
var User = require('../../model/User');
var config = require('config');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const gravatar = require('gravatar');


router.post('/' ,[check('name', 'Name is required').not().isEmpty(),
check('email', 'Please enter a valid email').isEmail(),
check('password', 'minimim 8 charechters required').isLength({min: 8})    
],
async (req,res) =>{
    const errors = validationResult(req);
    var {name,email,password} = req.body;
    if(!errors.isEmpty){
        return res.json({errors: errors.array()});
    }
   

    try {
        var user = await User.findOne({email: req.body.email});
        if(user){
            return res.json({msg: 'user alresdy exists'});
        }

        const avatar = gravatar.url( req.body.email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();

        const payload =  {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), (err,token)=>{
            if(err) throw err
            res.json({token: token})
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).send('server error');
    }

});

module.exports = router