const {Review} = require('../models');
const {Book} = require('../models');
const ApiError = require('../utils/ApiError');

const addReviewIntoBook = async (reqBody) => {
    try {
        const newReview = new Review(reqBody);
        const { bookId } = reqBody;
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
        throw new ApiError(500 , "failed to update book reviews");
    }
}
const softDeletedReview = async (id) => {
    const deleteBookReview = await Book.findByIdAndRemove(
        id,
        {$dic: {reviews: 1}, isDelete: true , deletedAt: Date.now()},
        {new: true}
    );
    return "Book review is soft deleted successfully";
}

module.exports = {
    addReviewIntoBook,
    softDeletedReview,
}
