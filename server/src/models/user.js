const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type: String},
    email:{type:String},
    phone:{type:Number},
    password:{type:String},
    country:{type:String},
    address: {type: String},
    role:{type:String}
    
   },{ collection: 'user' });
   
module.exports = mongoose.model('user', userSchema);
