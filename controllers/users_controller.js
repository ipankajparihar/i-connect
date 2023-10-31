const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    return res.render("user_profile", {
      title: "users",
      profile_user: user,
    });
  } catch (err) {
    console.log("profile errror", err);
  }
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("multer err", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          // if (user.avatar) {
          //   fs.unlinkSync(path.join(__dirname, "/", user.avatar));
          // }
          //this is saving the path of uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);

      return res.status(404).send("unauthorized");
    }
  }
};

//render the signup page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signup", {
    title: "users signup",
  });
};

//render the signin page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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
            req.flash("success", "signed up successfully");
            return res.redirect("/users/signin");
          })
          .catch((err) => {
            req.flash("error", err);

            return;
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      req.flash("error", err);

      return;
    });
};

//signing in for user
module.exports.createSession = function (req, res) {
  req.flash("success", "logged in successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "logged out");
    res.redirect("/");
  });
};
