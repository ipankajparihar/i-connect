const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "users",
  });
};

module.exports.signUp = function (req, res) {
  return res.render("signup", {
    title: "users signup",
  });
};

module.exports.signIn = function (req, res) {
  return res.render("signin", {
    title: "users signin",
  });
};

//get the sign up data

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .then((user) => {
            return res.redirect("/users/signin");
          })
          .catch((err) => {
            console.log("error creating the user in signing up");
            return;
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("error in finding the user in signing up");
      return;
    });
};

//signing in for user
module.exports.createSession = function (req, res) {};
