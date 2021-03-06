const User = require("../models/User");
const jwt = require("jsonwebtoken");
const isAuth = async (req, res, next) => {
  console.log("test");
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(401)
        .send({ errors: [{ msg: "you are not authorized1" }] });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // test if the user exist with that id
    const user = await User.findById(decoded.id).select("-password");
    // you are not authorised
    if (!user) {
      return res
        .status(401)
        .send({ errors: [{ msg: "you are not authorized2" }] });
    }

    // si non
    // req bech nzid user
    req.user = user;
    // next
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ errors: [{ msg: "you are not authorized" }] });
  }
};

module.exports = isAuth;
