const express = require("express") ;
const router = express.Router() ; 
const User = require("../models/user.js");
const userController = require("../controllers/user.js") ;

const asyncWrap = require("../utils/Asyncwrap.js") ; 
const passport = require("passport");
 const {saveRedirectURL} = require("../middleware.js") ; 


router.get("/signup",userController.renderSignUpForm);

router.post("/signup",asyncWrap(userController.signup));

router.get("/login",userController.renderLoginform);

router.post("/login",
    saveRedirectURL,
    passport.authenticate("local",
    {failureRedirect:'/login',
    failureFlash : true }
),
userController.login);

router.get("/logout",userController.logout) ;
module.exports = router

