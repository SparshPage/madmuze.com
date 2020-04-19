const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/Auth");
var User = require("../../../model/User");
var Product = require("../../../model/Product");
var config = require("config");
var jwt = require("jsonwebtoken");
const Cart = require("../../../model/Cart");
const Category = require("../../../model/Categories");
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

var upload = multer({ storage: storage });

router.post("/uploadImage", upload.single("image"), auth, (req, res) => {
  if (!req.file) {
    res.json({ msg: "idk what the fuck happen" });
  }
  console.log(req.file);
  res.json({
    success: true,
    image: req.file.path,
    filename: req.file.filename,
  });
});

router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }
  var { name, type, price, category, image, quant } = req.body;

  try {
    var product = await Product.findOne({ name: name });
    if (product) {
      return res.status(400).json({ msg: "product already added" });
    }
    product = new Product({
      name,
      type,
      price,
      image,
      category,
      quant,
    });

    await product.save();

    res.json({ product: product });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "server crashed" });
  }
});

module.exports = router;
