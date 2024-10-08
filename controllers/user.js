const User = require("../models/user.js") ;

module.exports.signup =async (req,res)=>{
    try{
    let {username , email,password} = req.body ;
    let newuser = new User({username,email}) ;
   const registeruser = await User.register(newuser,password) ;
   req.login(registeruser,(err)=>{
    if(err){
        return next(err) ;
    }
    req.flash("success","Welcome to WanderLust!");
    res.redirect("/listings") ; 
   });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup") ;
    }
};
module.exports.renderSignUpForm = (req,res)=>{
    res.render("./users/signup.ejs");
};

module.exports.renderLoginform = (req,res)=>{
    res.render("./users/login.ejs") ;
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome to WanderLust") ; 
    let resredirect = res.locals.redirectURL || "/listings" ;
    res.redirect(resredirect) ;
};



module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings") ; 
    });
};