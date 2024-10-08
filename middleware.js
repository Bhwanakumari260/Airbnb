const Listing = require("./models/listing.js") ; 
const Review = require("./models/review.js") ;
const { model } = require("mongoose");
const ExpressError = require("./utils/ExpressError.js") ;
const {listingSchema , reviewSchema} = require("./schema.js") ;
const review = require("./models/review.js");


module.exports.isloggedin = (req,res,next)=>{
    if(! req.isAuthenticated()){
        req.session.redirectUrl = req.path ;
    req.flash("error","You must be logged in for creating listings");
   return res.redirect("/login") ;
}   
next();
}
module.exports.saveRedirectURL= (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectURL = req.session.redirectUrl ; 
        console.log(res.locals.redirect);
    }
    next() ; 
}

module.exports.isowner = async (req,res,next)=>{
    let {id} = req.params ;
    let listing = await Listing.findById(id);
    if(! listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","Sorry!,You are not owner of the listing!") ;
         return res.redirect(`/listings/${id}`) ;
    }
    next() ;
}

module.exports.validatelisting = (req,res,next)=>{
    let {error}= listingSchema.validate(req.body) ; 
    if(error){
        let errmsg = error.details.map((el)=> el.message).join(",") ; 
        throw new ExpressError(400,errmsg);
    }
    else{
        next() ; 
    }
}

module.exports.validateReview = (req,res,next)=>{
    let {error}= reviewSchema.validate(req.body) ; 
    if(error){
        let errmsg = error.details.map((el)=> el.message).join(",") ; 
        throw new ExpressError(400,errmsg);
    }
    else{
        next() ; 
    }
};

module.exports.isreviewOwner = async (req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not owner of Review!");
        return  res.redirect(`/listings/${id}`) ;
    }
    next() ;
};