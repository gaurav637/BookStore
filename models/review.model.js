const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const reviewSchema = new mongoose.Schema({
    bookId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    reviewedBy:{
        type: String,
        required: true,
        default: "Guest",
        value: String
    },
    reviewedAt:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        minlength: [1,"rating must be 1 above and less than 5"],
        maxlength: [5,"rating must be 1 above and less than 5"],
        required: true
    },
    review:{
        type: String
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Review" , reviewSchema);