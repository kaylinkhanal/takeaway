const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    userName: {type:String},
    phone: {type:Number},
    email: {type:String},
    address: {type:String},
    password: {type:String},
    confirmPassword: {
        type: String,
        validate: {
          validator: function(value) {
            return value === this.password;
          },
          message: 'Passwords do not match'
        }
      }

   },{ collection: 'products' });
   
module.exports = mongoose.model('Register', usersSchema);