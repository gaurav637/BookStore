const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: function(value){
                return /^\d{10}$/.test(value);
            },
            message: "Invalid phone number format",
        },
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: function(value){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message:"Invalid Email format please try again!",
        },
    },
    password:{
        type: String,
        required: true,
        unique: true,
        minlength: [8, "password must be 8 characters above and less than 15 character"],
        maxlength: [15, "password must be 8 characters above and less than 15 character"]
    },
    address:{
        street:{
            type: String,
        },
        city:{
            type: String,
        },
        pincode:{
            type: String,
        }
    }
},{timestamps: true})

module.exports = mongoose.model('User',userSchema);
