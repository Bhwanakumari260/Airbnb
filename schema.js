const Joi = require('joi');
 
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required() , 
        description : Joi.string().required() ,
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().min(0).required(),
        image :  Joi.string().allow("",null)
    }).required()
}) ;


// module.exports = listingSchema ( wrong give error)  / /

module.exports.reviewSchema= Joi.object({
    review:Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment : Joi.string().required()
    }).required()
});

