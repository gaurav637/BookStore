const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    excerpt:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ISBN:{
        type: String,
        required: true,
        unique: true
    },
    category:{
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    reviews:{
        type: String,
        default: 0,
        comments: [],
    },
    deletedAt:{
        type: Date,
    },
    isDeletedAt:{
        type: Boolean,
        default: false
    },
    releasedAt:{
        type: Date,
        required: true,
        validate:{
            validator: function(value){
                return /^\d{4}-\d{2}-\d{2}$/.test(value.toISOString().slice(0,10));
            },
            message:"Invalid Date format! expected YYYY-MM-DD"
        },
    }
},{timestamp: true})

module.exports = mongoose.model("Book", bookSchema);