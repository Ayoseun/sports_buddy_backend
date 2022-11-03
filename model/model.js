const mongoose = require('mongoose');





const userSchema = new mongoose.Schema({
//set the key an id 
    name:{type:String},
    surname:{type:String},
    middleName:{type:String},
    username:{type:String},
    email:String,
    password:String,
    phone:String,
    otp:String,
    validated:Boolean
    




});


const   userModel = mongoose.model('userModel',userSchema);

//here usermodel gets exported
module.exports = userModel;

  