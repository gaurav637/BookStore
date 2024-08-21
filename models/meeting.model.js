const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    startTime:{
        type: String,
        required: true,
    },
    endTime:{
        type: String,
        required: true,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    }],
    status: {
        type: String,
        enum: ['Not Joined', 'Completed', 'joined', 'Left Early','On Time','Late'],
        default: 'Not Joined'
    },

},{timestamps: true});

const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;