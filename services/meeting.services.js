const {User} = require('../models');
const {Meeting} = require('../models');
const Agenda = require('agenda');
const moment = require('moment');
const agenda = new Agenda({ db: { address: process.env.MONGO_URI} });

module.exports.createMeeting = async (reqBody) => {
    try{
        const newMeet = await new Meeting(reqBody);
        newMeet.save();
        return newMeet;
    }catch(err){
        console.log("Error -> ",err.message);
        throw new Error("Failed to Create Meeting",err.message);
    }
}

module.exports.joinMeeting = async (reqBody) =>{
    try{
        const {userId,meetLink} = reqBody;
        const meeting = await Meeting.findByIdAndUpdate(
            meetLink,
            {
                $push: {participants: userId},
                $set: {status: 'joined'}
            },
            {new: true},
        );
        if (!meeting) throw new Error('Meeting not found');

        const meetingStartTime = moment(meeting.startTime);
        agenda.schedule(meetingStartTime.toDate(), 'update meeting status', {
            meetingId: meeting._id,
            userId,
            status: moment().isBefore(meetingStartTime) ? 'On Time' : 'Late',
        });
        return meeting;

    }catch(err){
        console.log("Error -> ",err.message);
        throw new Error("Failed to join Meeting",err.message);
    }
}

module.exports.exitMeeting = async (reqBody) =>{
    try{
        const {userId,meetLink} = reqBody;
        const meeting = await Meeting.findByIdAndUpdate(
            meetLink,
            {
                $pull: {participants: userId},
                $set: {status: 'Not Joined'}
            },
            {new: true},
        );
        if (!meeting) throw new Error('Meeting not found');
        const meetingEndTime = moment(meeting.endTime);
        agenda.schedule(meetingEndTime.toDate(), 'update meeting status', {
            meetingId: meeting._id,
            userId,
            status: moment().isBefore(meetingEndTime) ? 'Left Early' : 'Completed',
        });
        return meeting;

    }catch(err){
        console.log("Error -> ",err.message);
        throw new Error("Failed to join Meeting",err.message);
    }
}

module.exports.getMeetingById = async (id) =>{
    try{
        const meeting = await Meeting.findById(id);
        return meeting;
    }catch(err){
        console.log("Failed to get Meeting By Id ");
        throw new Error("Failed to get Meeting",err.message);
    }
}

module.exports.getAllMeeting = async ()=> {
    try{
        const meetings = await Meeting.find();
        return meetings;
    }catch(err){
        console.log("Failed to get all Meeting ");
        throw new Error("Failed to get Meeting",err.message);
    }
}
