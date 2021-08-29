const mongoose = require("mongoose");

const {MONGO_URI} = process.env;

exports.connect = () =>{
    mongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }).then(()=>{
        console.log("[LOG] DATABASE CONNECTION: Success");
    }).catch((error) =>{
        console.log("[ERR] DATABASE CONNECTION: Failed, exiting now...");
        console.error(error);
        process.exit(1);
    });
};