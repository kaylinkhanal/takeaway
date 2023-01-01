const mongoose = require('mongoose');

module.exports = connect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/takeaway", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to mongodb successfully");
    } catch (error) {
        console.error(error);
    }
};

connect();