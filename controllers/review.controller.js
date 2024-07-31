const {reviewService} = require('../services');
const ApiError = require('../utils/ApiError');

module.exports.addReview = async (req, res) => {
    try {
        const updatedBook = await reviewService.addReviewIntoBook(req.body);
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports.deleteBookReviews = async (req,res) => {
    try{
        const deleteBooksReview = await reviewService.softDeletedReview(req.body);
        res.status(200).json({
            Message: "Book Reviews Soft Deleted ",
            Data: deleteBooksReview,
        });

    }catch(err){
        res.json({Message: err.message});
    }
}

module.exports.updateReviews = async (req,res) => {
    try{
        const updateBookReview = await reviewService.updateReview(req.body);
        res.status(200).json({
            Message: "updated Reviews",
            Data:updateBookReview,
        });

    }catch(err){
        res.json({Message: err.message});
    }
}