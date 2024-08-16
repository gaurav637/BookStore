const setRateLimit = require("express-rate-limit");

const rateLimiterMiddleware = setRateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 5,
    message: "You have exceeded your 5 requests per minute limit.",
    headers: true,
});

module.exports = rateLimiterMiddleware;