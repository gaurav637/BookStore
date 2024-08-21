const express = require('express');
const {meetingController} = require('../controllers');
const router = express.Router();

router.post(
    "/create-meeting",
    meetingController.createMeeting,
);

router.get(
    "/get-meeting-byId",
    meetingController.getMeetingById,
);

router.get(
    "/get-meetings",
    meetingController.getAllMeetings,
);

router.post(
    "/join-meeting",
    meetingController.joinMeeting,
);

router.post(
    "/exit-meeting",
    meetingController.exitMeeting,
);


module.exports = router;