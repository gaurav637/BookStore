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
    authentication,
    bookController.getAllBooks
);

router.post(
    "/get-by-category",
    authentication,
    bookController.getBookByCategory
);

router.post(
    "/get-by-subcategory",
    authentication,
    bookController.getBookBySubcategory
);

router.get(
    "/get-by-sortname-alpha",
    authentication,
    bookController.getAllBookSortByNameAlphabaticalOrder
);

router.post(
    "/get-filtering",
    authentication,
    bookController.getBooksByFiltring
);

router.get(
    "/get-byId/:id",
    authentication,
    bookController.getBooksByObjectId
);

router.post(
    "/update/:id",
    authentication,
    bookController.updateBookData
);

router.delete(
    "/delete/:id",
    authentication,
    bookController.softDeleteBook
);

module.exports = router;