const mongoose = require('mongoose');
module.exports = connect=async()=>{
    try{
      //database = takeaway
        await mongoose.connect('mongodb://127.0.0.1:27017/takeaway', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected to mongodb");
    }catch(error){
        console.error(error);
    }
  }
<<<<<<< HEAD
  
=======
  
>>>>>>> 1116cf309c576cad60e1484e9cb419e6fab9f747
