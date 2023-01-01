const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    phoneNumber:{type: String},
    password: {type: String},
    conformPassword: {type: String},
    country:{type: String},
    address:{type: String},
    userRole:{type: String}
   },{ collection: 'user' });
   
module.exports = mongoose.model('User', userSchema);

