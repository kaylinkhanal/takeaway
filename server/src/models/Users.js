const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: { type: String,required:true},
    address: { type: String,required:true},
    email: { type: String,required:true },
    userName: { type: String,required:true },
    password: { type: String,required:true },
    confirmPassword:{type:String, required:true},
    role: { type: String, required:true},

}, { collection: 'users' })
module.exports = mongoose.model('Users', usersSchema)