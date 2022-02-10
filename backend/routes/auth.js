const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fetchUser = require("../middlewares/fetchUser");

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  [
    body(
      "username",
      "A unique username is required of length atleast 5 characters"
    ).isLength({ min: 5 }),
    body(
      "password",
      "A password is required of length atleast 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { username, password } = req.body;
    const lowercaseUsername = username.toLowerCase();
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Check if user with the username already exists
      const user = await User.findOne({ username: lowercaseUsername });
      if (user) {
        return res.status(400).json({
          success,
          error: "Username already taken, please try another",
        });
      } else {
        // create new user
        // create hash
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);
        const newUser = await new User({
          username: lowercaseUsername,
          password: securePassword,
        });
        // save user
        await newUser.save();
        success = true;
        // return jsonwebtoken
        const data = {
          user: {
            id: newUser._id,
          },
        };

        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        // return json response
        res.status(200).json({ success, newUser, authToken: authToken });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  [
    body(
      "username",
      "Username is required of length atleast 5 characters"
    ).isLength({ min: 5 }),
    body(
      "password",
      "A password is required of length atleast 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success = false;

    const { username, password } = req.body;
    const lowercaseUsername = username.toLowerCase();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Check if user exists
      const user = await User.findOne({ username: lowercaseUsername });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Username not found, please enter a valid username",
        });
      } else {
        //   if user exists, check if password is correct by comparing hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          success = false;
          return res.status(400).json({ success, error: "Invalid password" });
        } else {
          //  if password is correct, return jsonwebtoken
          const data = {
            user: {
              id: user._id,
            },
          };

          const authToken = jwt.sign(data, process.env.JWT_SECRET);
          success = true;
          // return json response
          res.status(200).json({ success, user, authToken: authToken });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/auth/currentuser
// @desc    Current user
// @access  Private

router.get("/currentuser", fetchUser, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res.status(200).json({ currentUser });
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
