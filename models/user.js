// const { name } = require("faker/lib/locales/az");
const { required } = require("joi");
const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
const passportLoclMongoose = require("passport-local-mongoose") ; 

const userSchema = new Schema({
  email:{
    type:String,
    required:true
  }
});
userSchema.plugin(passportLoclMongoose) ; 
module.exports = mongoose.model("User",userSchema) ;