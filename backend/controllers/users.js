const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");

const generateToken = (params = {}, res) => {
  return jwt.sign(
    params,
    process.env.JWT_SECRET,
    { expiresIn: 7200 },
    (err, token) => {
      if (err) console.error(err);
      res.json({ token });
    }
  );
};

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    generateToken({ userId: user._id.toString() }, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.authenticateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatchPasswords = await bcrypt.compare(password, user.password);

    if (!isMatchPasswords) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    generateToken({ userId: user._id.toString() }, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
