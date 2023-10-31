const jwt = require("jsonwebtoken");
const User = require("../../../models/user");
const env = require("../../../config/environment");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.status(401).json({
        message: "invalid username and password",
      });
    }

    return res.status(200).json({
      message: "sign in success,here is your token",
      data: {
        token: jwt.sign({ user: user }, env.jwt_secret_key, {
          expiresIn: "100000",
        }),
      },
    });
  } catch (err) {
    console.log("error", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
