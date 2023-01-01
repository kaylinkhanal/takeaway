const mongoose = require('mongoose');

//structure how the user is gonna look like
const userSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        
    },
    userName: {
        type: String,
        
      
    },
    number: {
        type: Number, // or we can write Int32Array
        
    },
    role:{
        type: String,
       
    },
    email: {
        type: String,
       
    },
    password: {
        type: String,
       
    },
    
});

const User = mongoose.model('User', userSchema);
module.exports = User;