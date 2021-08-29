const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    //fields needed to use the system
    username: {type: String, unique:true},
    password: {type: String},
    access_level: {type: String, default: null},
    access_level_expiration: {type: String, default: null},
    token: {type: String},
    
    //fields for contact information
    email: {type: String, unique:true},
    first_name: {type: String, default: null},
    last_name: {type: String, default: null},
});

module.exports = mongoose.model("user",userSchema);