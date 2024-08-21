const {meetingServices} = require('../services');


module.exports.createMeeting = async (req,res) => {
    try{
        const meeting = await meetingServices.createMeeting(req.body);
        res.status(201).json({
            Message: "create Meeting",
            Success: true,
            Data: meeting,
        });
    }catch(err){
        res.status(500).json({
            Message: err.message,
            Success: "false"
        });
    }
}

module.exports.joinMeeting = async (req,res) =>{
    try{
        const meet = await meetingServices.joinMeeting(req.body);
        res.status(200).json({
            Message: "User Join Meeting",
            Success: "true",
            Data: meet,
        });

    }catch(err){
        res.status(500).json({
            Message: err.message,
            Success: "false"
        });
    }
}

module.exports.exitMeeting = async (req,res) =>{
    try{
        const meet = await meetingServices.exitMeeting(req.body);
        res.status(200).json({
            Message: "User Exit Meeting",
            Success: "true",
            Data: meet,
        });

    }catch(err){
        res.status(500).json({
            Message: err.message,
            Success: "false"
        });
    }
}

module.exports.getMeetingById = async (req,res) => {
    try{
        const meet = await meetingServices.getMeetingById(req.id);
        res.status(200).json({
            Message: "Get Meeting By Id'",
            Success: true,
            Data: meet,
        });
    }catch(err){
        res.status(500).json({
            Message: err.message,
            Success: "false"
        });
    }
}

module.exports.getAllMeetings = async (req,res) => {
    try{
        const meetings = await meetingServices.getAllMeetings();
        res.status(200).json({
            Message: "Get All Meeting'",
            Success: true,
            Data: meetings,
        });
    }catch(err){
        res.status(500).json({
            Message: err.message,
            Success: "false"
        });
    }
}