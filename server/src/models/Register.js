const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    name: {type: String},
    address: {type: String},
    email: {type: String},
    Number: {type: String},
    password: {type: String},
    confirmPassword: {type: String}
   },{ collection: 'register' });
   
module.exports = mongoose.model('Register', registerSchema);

