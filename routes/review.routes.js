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

router.put(
    "/update",
    reviewController.updateReviews
);
module.exports = router;