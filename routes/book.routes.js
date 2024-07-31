const express = require('express');
const {bookController} = require('../controllers');
const authentication = require('../middlewares/auth.middleware');
const router = express.Router();

router.post(
    "/create",
    authentication,
    bookController.createBook
);

router.get(
    "/get-all",
    bookController.getAllBooks
);

router.post(
    "/get-by-category",
    bookController.getBookByCategory
);

router.post(
    "/get-by-subcategory",
    bookController.getBookBySubcategory
);

router.get(
    "/get-by-sortname-alpha",
    bookController.getAllBookSortByNameAlphabaticalOrder
);

router.post(
    "/get-filtering",
    bookController.getBooksByFiltring
);

router.get(
    "/get-byId/:id",
    bookController.getBooksByObjectId
);

router.post(
    "/update/:id",
    bookController.updateBookData
);

router.delete(
    "/delete/:id",
    bookController.softDeleteBook
);

module.exports = router;