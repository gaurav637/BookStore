const {bookService} = require('../services');
const ApiError = require('../utils/ApiError');

module.exports.createBook = async (req,res) => {
    const book = await bookService.createBook(req.body);
    res.status(201).json({
        Message: "Book created",
        Data: book
    });
};

module.exports.getAllBooks = async (req,res) => {
    try{
        const books = await bookService.getAllBook();
        res.status(200).json({
            Message: "All User",
            Data: books
        });
    }catch(err){
        res.status(204).json({Message: err.message})
    }
}