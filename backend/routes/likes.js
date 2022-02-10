const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../middlewares/fetchUser");

// @route  PUT api/user/liked
// @desc   Like the website
// @access Private

router.put("/like", fetchUser, async (req, res) => {
  try {
    let success = false;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success, error: "User not found" });
    } else {
      if (user.liked === true) {
        return res.status(400).json({ success, error: "Already liked" });
      } else {
        user.liked = true;
        await user.save();
        success = true;
        return res.status(200).json({ success, user });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
