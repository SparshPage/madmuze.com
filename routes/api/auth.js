const express = require("express");
const router = express.Router();
const auth = require("../../middleware/Auth");
var User = require("../../model/User");
var config = require("config");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

//@route GET api/auth
//@desc test route
//@access Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      console.log("no user");
    }
    res.json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "server crashed" });
  }
});

router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "minimim 8 charechters required").exists()
  ],
  async (req, res) => {
    var errors = validationResult(req);
    var { name, email, password } = req.body;
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ msg: "user not found" });
      }

      var isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid password" });
      }

      //sign jwt token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token: token });
        }
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({ msg: "server crashed" });
    }
  }
);

module.exports = router;
