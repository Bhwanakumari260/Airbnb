const Listing = require("../models/listing.js");
const Review  = require("../models/review.js") ; 

module.exports.createreview = async (req,res)=>{ 
    let {id} = req.params;
    let listing = await Listing.findById(id) ;
    let newreview =  new Review(req.body.review);
    newreview.author = req.user._id;
    listing.reviews.push(newreview) ; 
    
    await newreview.save();
    await listing.save();

    console.log("new review saved") ;
    req.flash("success","New review created!")
    res.redirect(`/listings/${id}`) ; 
};



module.exports.destroyreview = async (req,res)=>{
    let {id,reviewId} = req.params;
     await Listing.findByIdAndUpdate(id, {$pull:{reviews : reviewId}}) ; 
     await Review.findByIdAndDelete(reviewId) ;
     req.flash("success","review is deleted!")
     res.redirect(`/listings/${id}`) ; 
};
