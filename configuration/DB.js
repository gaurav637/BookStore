const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
        const url = process.env.MONGO_URI;
        mongoose.connect(url);
        console.log('database connected');
    }catch(err){
        console.log("database disconnected!");
        throw new ApiError(
            INTERNAL.SERVER.ERROR,
            "failed to connect database",
        )
    }
}

module.exports = connectDB;