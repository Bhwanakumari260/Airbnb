const mongoose = require('mongoose') ;
const initdata = require("./data.js") ;
const Listing = require("../models/listing.js") ; 

// form connection with db //
main()
.then(()=>{
    console.log("connected to db") ; 
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};


const initdb = async ()=> {
   await Listing.deleteMany({}) ;
    initdata.data = initdata.data.map((obj)=>({...obj , owner : '66f6cf08fdbb5e72a9ed1cd6'}));
   await Listing.insertMany(initdata.data) ; 
   console.log("data was initilised  in db") ; 
};

initdb() ; 