const express = require('express');
const {reviewController} = require('../controllers');
const router = express.Router();

router.post(
    "/add-review",
    reviewController.addReview
);

router.delete(
    "/delete",
    reviewController.deleteBookReviews
);

module.exports = router;