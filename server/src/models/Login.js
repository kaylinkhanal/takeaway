const mongoose = require('mongoose');
const loginSchema = new mongoose.Schema({
    name: {type: String},
    password: {type: String},
    },{ collection: 'Login' });
   
module.exports = mongoose.model('Login', loginSchema);