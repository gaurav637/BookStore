const express = require('express');
const {userController} = require('../controllers');
const router = express.Router();

router.post(
    "/create",
    userController.createNewUser
);


module.exports = router;