const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    phoneNumber:{type: String},
    password: {type: String},
    conformPassword: {type: String},
    country:{type: String},
    address:{type: String},
    role:{type: String}
   },{ collection: 'users' });
   
module.exports = mongoose.model('Users', userSchema);

