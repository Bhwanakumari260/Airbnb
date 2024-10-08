const express = require("express") ;
const router = express.Router({mergeParams:true}) ;
const asyncWrap = require("../utils/Asyncwrap.js") ; 
const Review = require("../models/review.js");
const Listing = require("../models/listing.js") ; 
const {validateReview,isloggedin,isreviewOwner} = require("../middleware.js");
const reviewController = require("../controllers/review.js") ; 


 //Review // 
 // post route //
 router.post("/listings/:id/reviews",
   validateReview,
   isloggedin ,
   asyncWrap(reviewController.createreview));
 // delete review route //
router.delete("/listings/:id/reviews/:reviewId",
   isloggedin ,
   isreviewOwner,
   asyncWrap(reviewController.destroyreview));

 module.exports = router;