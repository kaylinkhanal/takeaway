const mongoose= require('mongoose')
const registerSchema= new mongoose.Schema({
    name:{
    type:String,
    required:true
},
phoneNumber:{
    type:Number,
    required:true

},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:true
},
confirmPassword:{
    type:String,
    required:true
}
   },{ collection: 'register' });
module.exports = mongoose.model('Register', registerSchema);
