const express = require("express");
const router = express.Router();
const auth = require("../../middleware/Auth");
var User = require("../../model/User");
var Product = require("../../model/Product");
var config = require("config");
var jwt = require("jsonwebtoken");
const Cart = require("../../model/Cart");
const Category = require("../../model/Categories");
const { check, validationResult } = require("express-validator");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", async (req, res) => {
  let findArgs = {};
  console.log(req.body);
  for (let key in req.body) {
    if (req.body[key].length > 0) {
      if (key === "price") {
      } else {
        findArgs[key] = req.body[key];
        console.log(req.body[key]);
        console.log(findArgs);
      }
    }
  }

  let product = await Product.find(findArgs);
  try {
    if (!product) {
      res.status(404).json({ msg: "Not Found" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.json("this shit is fucked up nigga");
  }
});

router.get("/product_by_id", async (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = [];
    productIds = ids.map((item) => {
      return item;
    });
  }

  try {
    let product = await Product.find({ _id: { $in: productIds } }).populate(
      "_id"
    );

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, msg: error });
  }
});

// router.post("/", upload.single("image"), async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     res.json({ errors: errors.array() });
//   }
//   var { name, type, price, category } = req.body;
//   var image = req.file.path;

//   try {
//     var product = await Product.findOne({ name: name });
//     if (product) {
//       return res.status(400).json({ msg: "product already added" });
//     }
//     product = new Product({
//       name,
//       type,
//       price,
//       image,
//     });
//     category = new Category({
//       category,
//     });

//     await product.save();
//     await category.save();
//     res.json({ product: product, category: category });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ msg: "server crashed" });
//   }
// });

router.post("/:product_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const product = await Product.findById(req.params.product_id);
    var cart = await Cart.findOne({ user: user.id });
    if (!cart) {
      cart = new Cart({
        user: user.id,
        Items: [],
        totalQty: 0,
        total: 0,
      });
    }

    cart.Items.unshift(product);
    cart.totalQty += 1;
    cart.total = cart.total + product.price;
    cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "server crashed" });
  }
});

// router.delete("/:product", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");

//     var cart = await Cart.findOne({ user: user.id });
//     if (!cart) {
//       return res.json({ msg: "there are no items in your cart" });
//     }
//     const products = await cart.Items.find(
//       product => product.id === req.param.product_id
//     );

//     const removeIndex = cart.Items.map(products =>
//       indexOf(req.param.product_id)
//     );
//     cart.Items.splice(removeIndex, 1);
//   } catch (error) {}
// });

module.exports = router;
