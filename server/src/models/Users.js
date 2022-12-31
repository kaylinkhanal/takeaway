const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type: String},
    address: {type: String},
    number:{type:Number},
    email: {type: String},
    phoneNumber:{type:Number},
    password:{type:String},
    confirmPassword:{type:String}
   },{ collection: 'users' });
   
module.exports = mongoose.model('users', userSchema);