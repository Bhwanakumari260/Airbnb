const express = require("express") ;
const asyncWrap = require("../utils/Asyncwrap.js") ; 
const Listing = require("../models/listing.js") ; 
const {isloggedin,isowner,validatelisting} = require("../middleware.js");

const router = express.Router() ;
const Joi = require('joi');
const listingController = require("../controllers/listing.js") ;
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
//New route  // 
router.get("/listings/new",isloggedin,listingController.renderNewForm) ;
 
router.route("/listings")
.get( asyncWrap(listingController.index)
)
.post(isloggedin,
    upload.single("listing[image]"), 
    validatelisting ,
    asyncWrap(listingController.createlisting));




//show route //
router.get("/listings/:id",asyncWrap(listingController.showlisting));


// Edit route //
router.get("/listings/:id/edit",isloggedin, isowner,
    asyncWrap(listingController.renderEditForm));

 //Update route //
 router.put("/listings/:id",isloggedin,isowner ,
    upload.single("listing[image]"), 
    validatelisting,asyncWrap(listingController.upadatelisting));

 //Delete route // 
 router.delete("/listings/:id",isloggedin,isowner, asyncWrap(listingController.deletelisting));

 module.exports = router;