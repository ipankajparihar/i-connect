const passport = require("passport");

const JWTstrategy = require("passport-jwt").Strategy;

const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const env = require("./environment");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret_key,
};

passport.use(
  new JWTstrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        console.log("error finding user from JWT");
        return;
      });
  })
);

module.exports = passport;
