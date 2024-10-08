const Listing = require("../models/listing.js") ;
const mapGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const accessToken = process.env.MAP_TOKEN ; 
const geocodingClient = mapGeocoding({ accessToken: accessToken});

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({}) ;
    res.render("./listing/index.ejs",{allListings}) ; 
     
 };

 module.exports.renderNewForm = (req,res)=>{
    res.render("./listing/new.ejs") ; 
};

module.exports.showlisting = async (req,res)=>{
    let {id}= req.params ;
    let listings = await Listing.findById(id).populate(
        {
            path :"reviews",
            populate :{
                path :"author"
            },
        })
         .populate("owner") ;
    if(!listings){
        req.flash("error","listing you requested does not exit!");
        res.redirect("/listings") ; 
    }
    res.render("./listing/show.ejs",{listings}) ; 
};

module.exports.createlisting = async (req,res,next)=>{
 let response = await  geocodingClient
   .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send();

    let url = req.file.path ;
    let filename = req.file.filename;
    let listing = req.body.listing ;
    let newlisting = new Listing(listing) ; 
    newlisting.owner = req.user._id ;
    newlisting.image ={filename,url};
    newlisting.geometry = response.body.features[0].geometry;
     let savelisting = await newlisting.save();
     console.log(savelisting); 
    req.flash("success","New Listing is created!");
    res.redirect("/listings");
    console.log("new listing created") ; 
};

module.exports.renderEditForm =async (req,res)=>{
    let {id}= req.params;
    let listing =  await Listing.findById(id) ;
    if(!listing){
        req.flash("error","listing you edit does not exit!") ;
    }
    let originalLink = listing.image.url ;
    let originalimageUrl = originalLink.replace("/upload","/upload/h_300,w_250");
    res.render("./listing/edit.ejs",{ listing,originalimageUrl}) ; 
};

module.exports.upadatelisting = async (req,res)=>{
    let {id} = req.params ;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!== "undefined"){
    let url = req.file.path ;
    let filename = req.file.filename ; 
    listing.image = {filename,url};
    await listing.save() ;
    }
    req.flash("success","Listing is updated!")
    res.redirect(`/listings/${id}`) ;
};

module.exports.deletelisting = async (req,res)=>{
    let {id} = req.params ;
     let deletedlisting = await Listing.findByIdAndDelete(id);
     console.log(deletedlisting) ;
     req.flash("success","Listing is deleted!") ;
     res.redirect("/listings") ; 
};
