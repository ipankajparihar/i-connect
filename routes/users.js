const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

router.get("/profile", passport.checkAuthentication, usersController.profile);
router.get("/signin", usersController.signIn);
router.get("/signup", usersController.signUp);

router.post("/create", usersController.create);

//use passport as middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  usersController.createSession
);

router.get("/signout", usersController.destroySession);

module.exports = router;
