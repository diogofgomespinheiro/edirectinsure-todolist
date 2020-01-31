const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const userController = require("../controllers/users");

// @route   GET users/me
// @desc    Get user data
// @access  Private
router.get("/me", auth, (req, res) => {
  res.send("User Route Working");
});

// @route   GET users/login
// @desc    Login user
// @access  public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  userController.authenticateUser
);

// @route   GET users/register
// @desc    Register user
// @access  public
router.post(
  "/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  userController.registerUser
);

module.exports = router;
