const express = require("express");
const router = express.Router();

// @route   GET users/me
// @desc    Get user data
// @access  Private
router.get("/me", (req, res) => {
  res.send("User Route Working");
});

module.exports = router;
