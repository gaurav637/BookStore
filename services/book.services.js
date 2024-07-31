const {Book} = require('../models');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createBook = async (reqBody) => {
    const book = new Book(reqBody);
    return book.save();
}

const getAllBook = async () => {
    const books = await Book.find();
    return books;
}

const getBooksByCategory = async (reqBody) => {
    const books = await Book.find(reqBody);
    return books;
}

const getBooksBySubcategory = async (reqBody) => {
    const books = await Book.find(reqBody);
    return books;
}

const getAllBooksSortedByNameAlphabaticalOrder = async () => {
    const books = await Book.find().sort({title: 1});
    return books;
}

const getBookByFilterBookData = async (searchKey) => {
    if(!searchKey){
        throw new ApiError(500, "Request body is not defind");
    }
    let reqBody = {};
    if (searchKey && searchKey !== "") {
        const trimmedSearchKey = String(searchKey).trim();
        reqBody = {
            $or: [
                { category: { $regex: trimmedSearchKey.trim(), $options: "i" } },
                { subcategory: { $regex: trimmedSearchKey.trim(), $options: "i" } }
            ]
        };
    }
    console.log("reqBody -> ",reqBody);
    const books = await Book.find(reqBody);
    return books;
};

const getBookByObjectId = async (id) => {
    const books = await Book.findById(id);
    return books;
}

const updateBook = async (reqBody,id,token) => {
    const book = await Book.findById(id);
    const {userId} = book;
    const decoded = await jwt.verify(token,process.env.SECRET_KEY);
    if(userId!=decoded.userId){
       throw new ApiError(500, "Not change another user book details");
    }
    const updatedBook = await Book.findByIdAndUpdate(
        id,             
        reqBody,        
        { new: true }  
    );
    if (!updatedBook) {
        throw new ApiError(404, "not Found");
    }
    return updatedBook;
}

const deleteBookById = async (id,token) => {
    const book = await Book.findById(id);
    const {userId} = book;
    const decoded = await jwt.verify(token,process.env.SECRET_KEY);
    if(userId!=decoded.userId){
       throw new ApiError(500, "Not change another user book details");
    }
    if(book.isDelete){
        throw new ApiError(500, "Book is already deleted")
    }
    const deleteBook = await Book.findByIdAndUpdate(
        id,
        {isDelete: true},
        {new: true}
    );
    if(!deleteBook){
        throw new ApiError(404, "Not Found");
    }
    return deleteBook;
}

module.exports = {
    createBook,
    getAllBook,
    getBooksByCategory,
    getBooksBySubcategory,
    getAllBooksSortedByNameAlphabaticalOrder,
    getBookByFilterBookData,
    getBookByObjectId,
    updateBook,
    deleteBookById,
}