const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const bookRoutes = require('./book.routes');
const reviewRoutes  = require('./review.routes');
const meetingRoutes = require('./meeting.routes');

const routes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/book',
        route: bookRoutes
    },
    {
        path: '/review',
        route: reviewRoutes
    },
    {
        path: '/meeting',
        route: meetingRoutes
    },
]

routes.map((obj) => {
    router.use(obj.path , obj.route);
});

module.exports = router;