const express = require("express");
const router = express.Router();
const User = require("../models/user.js");//requiring listing model
const wrapAsync = require("../utils/wrspAsync.js");
const ExpressError = require("../utils/ExpressErrors.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")
    .get(userController.signumForm)
    .post(wrapAsync(userController.signup));

router.route("/login")
    .get(userController.loginForm)
    .post(
        saveRedirectUrl, 
        passport.authenticate("local",{ failureRedirect:'/login',failureFlash:true}),
        userController.login,
    );

router.get("/logout",userController.logout);

module.exports = router;