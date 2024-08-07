const {bookService} = require('../services');
const ApiError = require('../utils/ApiError');

module.exports.createBook = async (req,res) => {
    const book = await bookService.createBook(req.body);
    res.status(201).json({
        Message: "Book created",
        Data: book
    });
};

module.exports.getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBook();
        if (!books) {
            return res.status(404).json({
                Message: "No Books Found",
                Data: []
            });
        }
        res.status(200).json({
            Message: "All Books",
            Data: books
        });
    } catch (err) {
        res.status(500).json({
            Message: err.message
        });
    }
};
module.exports.getBookByCategory = async (req,res) => {
    try{
        const books = await bookService.getBooksByCategory(req.body);
        res.status(200).json({
            Message: "All Books",
            Data: books
        });
    }catch(err){
        res.status(500).json({Message: err.message});
    }
}

module.exports.getBookBySubcategory = async (req,res) => {
    try{
        const books = await bookService.getBooksBySubcategory(req.body);
        res.status(200).json({
            Message: "All Books",
            Data: books
        });

    }catch(err){
        res.status(500).json({Message: err.message});
    }
}

module.exports.getAllBookSortByNameAlphabaticalOrder = async (req,res) => {
    try{
        const books = await  bookService.getAllBooksSortedByNameAlphabaticalOrder();
        res.status(200).json({
            Message: "All Books",
            Data: books
        });
    }catch(err){
        res.status(500).json({Message: err.message});
    }
}

module.exports.getBooksByFiltring = async (req,res) => {
    try{
        const searchKey = req.body;
        const books = await bookService.getBookByFilterBookData(searchKey);
        res.status(200).json({
            Message: "All Filter Books",
            Data: books
        });
    }catch(err){
        res.status(500).json({Message: err.message});
    }
}

module.exports.getBooksByObjectId = async (req,res) => {
    try{
        const { id } = req.params;
        const books = await bookService.getBookByObjectId(id);
        res.status(200).json({
            Message: "Book Data",
            Data: books
        });
    }catch(err){
        res.status(500).json({Message: err.message});
    }
}

module.exports.updateBookData = async (req,res) => {
    try{
        const {id} = req.params;
        const reqBody = req.body;
        const bearerToken = req.header('Authorization');
        const tokenParts = bearerToken.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ Message: 'Invalid token format' });
        }
        const token = tokenParts[1];

        const books = await bookService.updateBook(reqBody,id,token);
        res.status(200).json({
            Message: "Updated Book",
            Data: books
        });
    }catch(err){
        res.status(500).json({Message: err.message});
    }
}

module.exports.softDeleteBook = async (req,res) => {
    try{
        const bearerToken = req.header('Authorization');
        const tokenParts = bearerToken.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ Message: 'Invalid token format' });
        }
        const token = tokenParts[1];
        const {id} = req.params;
        const books = await bookService.deleteBookById(id,token);
        res.status(200).json({
            Message: "Deleted Book",
            Data: books
        });
    }catch(err){
        res.status(500).json({Message: err.message});
    }
}