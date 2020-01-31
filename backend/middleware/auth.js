const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const [scheme, token] = req.headers.authorization.split(" ");

    if (!token) {
      return res
        .status(401)
        .json({ msg: "There is no token, authorization denied" });
    }

    if (scheme !== "Bearer") {
      return res
        .status(401)
        .json({ msg: "Token malformatted, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token it´s not valid" });
  }
};
