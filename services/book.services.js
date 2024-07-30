const {Book} = require('../models');
const ApiError = require('../utils/ApiError');

const createBook = async (reqBody) => {
    const book = new Book(reqBody);
    return book.save();
}

const getAllBook = async () => {
    const books = await Book.find();
    return books;
}

const getBooksByCategory = async (reqBody) => {
    const books = await Book.find({reqBody});
    return books;
}

//const getBooksBySubcategory = async

module.exports = {
    createBook,
    getAllBook,
}