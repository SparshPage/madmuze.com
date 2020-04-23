const express = require("express");
const router = express.Router();
const auth = require("../../middleware/Auth");
var User = require("../../model/User");
var Product = require("../../model/Product");
var config = require("config");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const stripe = require("stripe")("sk_test_C1EHGUj4hwRTWCcpxeABXDMG003OYNuZR1");
const Payment = require("../../model/Payments");
const async = require("async");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "minimim 8 charechters required").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    var { name, email, password } = req.body;
    if (!errors.isEmpty) {
      return res.json({ errors: errors.array() });
    }

    try {
      var user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.json({ msg: "user alresdy exists" });
      }

      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
        if (err) throw err;
        res.json({ token: token });
      });
    } catch (error) {
      console.log(error);

      res.status(500).send("server error");
    }
  }
);

router.get("/addToCart", auth, (req, res) => {
  User.findOne({ _id: req.user.id }, (err, userInfo) => {
    let duplicate = false;

    userInfo.cart.forEach((item) => {
      if (item.id === req.query.productId) {
        duplicate = true;
      }
    });

    if (!duplicate) {
      User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: {
            cart: {
              id: req.query.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },

        (err, userInfo) => {
          if (err || userInfo.cart === [])
            return res.json({ success: false, error: err });
          res.status(200).json(userInfo.cart);
          console.log(userInfo.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user.id, "cart.id": req.query.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          console.log(userInfo);
          res.status(200).json(userInfo.cart);
          console.log(userInfo.cart);
        }
      );
    }
  });
});

router.get("/removeFromCart", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user.id },
    {
      $pull: { cart: { id: req.query._id } },
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      });

      Product.find({ id: { $in: array } })
        .populate("_id")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart,
          });
        });
    }
  );
});

router.post("/successBuy", auth, (req, res) => {
  let history = [];
  let trasnsactionData = {};

  //1. Put payment information in user collection
  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      id: item._id._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.token.id,
    });
  });

  //2. Put payment information in Payment collection
  trasnsactionData.user = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  };

  trasnsactionData.data = req.body.token.card;
  trasnsactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user.id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      payment = new Payment(trasnsactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        //3. Decrease the stock of products
        let products = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  quant: -item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

router.get("/userCartInfo", auth, (req, res) => {
  User.findOne({ _id: req.user.id }, (err, userInfo) => {
    let cart = userInfo.cart;
    let array = cart.map((item) => {
      return item.id;
    });

    Product.find({ _id: { $in: { array } } })
      .populate("_id")
      .exec((err, cartDetail) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, cart, cartDetail });
      });
  });
});
module.exports = router;
