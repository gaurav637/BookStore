const express = require('express');
const {bookController} = require('../controllers');
const authentication = require('../middlewares/auth.middleware');
const router = express.Router();

router.post(
    "/create",
    // authentication,
    bookController.createBook
);

router.get(
    "/get-all",
    bookController.getAllBooks
);


module.exports = router;