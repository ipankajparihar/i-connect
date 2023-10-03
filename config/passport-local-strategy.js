const passport = require("passport");

const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //find the user and estabilish the identity

      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            console.log("invalid username/password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log("error in finding the user --> passport");
          return done(err);
        });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log("error in finding the user --> passport");
      return done(err);
    });
});

//check if user is authenticated or not
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  //user is not signed in
  return res.redirect("/users/signin");
};

//
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current user from the session cookie and we are sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
