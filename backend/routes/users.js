const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// @route   GET users/me
// @desc    Get user data
// @access  Private
router.get("/me", auth, (req, res) => {
  res.send("User Route Working");
});

module.exports = router;
