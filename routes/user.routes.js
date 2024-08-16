const express = require('express');
const {userController} = require('../controllers');
const router = express.Router();
const rateLimiterMiddleware = require('../middlewares/rateLimiter.middleare');

router.post(
    "/create",
    userController.createUser
);
router.post(
    "/signin", 
    userController.signin
);
router.get(
    "/logout", 
    userController.logout
);
router.get(
    "/get-all",
    rateLimiterMiddleware,
    userController.getAllUser
);

module.exports = router;