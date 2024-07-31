const {Review} = require('../models');
const {Book} = require('../models');
const ApiError = require('../utils/ApiError');

const addReviewIntoBook = async (reqBody) => {
    try {
        const newReview = new Review(reqBody);
        const { bookId, reviewedBy } = reqBody;
        const existingReview = await Review.findOne({ bookId, reviewedBy });
        if (existingReview) {
            throw new ApiError(400,'User has already reviewed this book');
        }
        await newReview.save();
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            {
                $inc: { reviews: 1 },
                $push: { comments: newReview},
                reviewedAt: Date.now()
            },
            { new: true }
        );
        return newReview;
    } catch (error) {
        throw new ApiError(500 , "user already review this book");
    }
}

const softDeletedReview = async (reqBody) => {
    const {bookId, reviewedBy,_id} = reqBody;
    const reviewData = await Review.findById(_id);
    if(reviewData.isDelete){
        throw new ApiError(500, 'this reviews already deleted!');
    }
    const existingReview = await Review.findOne({bookId, reviewedBy,_id});
    if(!existingReview){
        throw new ApiError(404, "review not found ");
    }

    const updatedReview = await Review.findByIdAndUpdate(
        _id,
        {$set: {isDelete: true, deletedAt: Date.now()}},
        {new: true}
    );
    const book = await Book.findOneAndUpdate(
        { _id: bookId },
        {
            $inc: { reviews: -1 }
        },
        { new: true }
    );
    return "Book review is soft deleted successfully";
}

const updateReview = async (reqBody) => {
    const {bookId, reviewedBy,_id}  = reqBody;
    const existingReview = await Review.findOne({bookId, reviewedBy,_id});
    if(!existingReview){
        throw new ApiError(500 , "Review not found !");
    }
    const updateBookReview = await Review.findByIdAndUpdate(
        _id,
        reqBody,
        {new: true}
    );
    return updateBookReview;
}

module.exports = {
    addReviewIntoBook,
    softDeletedReview,
    updateReview,
}
