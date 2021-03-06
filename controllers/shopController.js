var express = require("express");
var bookService = require('../models/bookService');
//const Page = require('./PageWeb');

exports.Shop = (req,res,next) => {
    index(req,res,next);
}

exports.book = async (req, res, next) => {
    //const item = req.body.book_id;
    // Get detailbooks from model
    var BookID = req.params.id;
    //get book
    const detail = await bookService.getBookByID(BookID);

    //get related book
    var books = await bookService.getRelatedBook(detail.id);
    books = await bookService.getBooksAndString(books);

    //get reviews
    var reviews = await bookService.getReviews(BookID, 1);

    //get review page
    var page = await bookService.getPageReview(BookID, 1);

    res.render('detailBook/detail', {layout: 'detaillayout', detail, books, reviews, page});
};


async function index (req, res, next) {
    //Get current page, default by 1
    const curPage = +req.query.page || 1;

    //Get Search
    const search = req.query.search || "";

    //Get catogory
    const category = req.query.category || "";

    //Get Sort type
    const sort = req.query.sort || "";

    //Get price
    const price = req.query.price || "";

    //Get Supplier
    const supplier = req.query.supplier || "";

    //Get Author
    const author = req.query.author || "";

    //Get publisher
    const publisher = req.query.publisher || "";


    //Get Page infomation
    const page = await bookService.pageNumber(curPage, search, category, price, author, publisher, supplier,);

    // Get books from model
    var books = await bookService.getBooks(page.currentPage, search, category, sort, price, author, publisher, supplier,);
    books = await bookService.getBooksAndString(books);


    //get new url
    const categoryURL = await bookService.getURL(search, category, sort, price, author, publisher, supplier, 1);
    const defaultcategoryURL = categoryURL.substring(0,categoryURL.length-1);

    const sortURL = await bookService.getURL(search, category, sort, price, author, publisher, supplier, 2);
    const defaultsortURL = sortURL.substring(0,sortURL.length-1);

    const priceURL = await bookService.getURL(search, category, sort, price, author, publisher, supplier, 3);
    const defaultpriceURL = priceURL.substring(0,priceURL.length-1);

    /*const authorURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 4);
    const defaultauthorURL = authorURL.substring(0,authorURL.length-1);

    const publisherURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 5);
    const defaultpublisherURL = publisherURL.substring(0,publisherURL.length-1);

    const supplierURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 6);
    const defaultsupplierURL = supplierURL.substring(0,supplierURL.length-1);*/

    const sortCode = await bookService.getSortCode(sort);
    const priceCode = await bookService.getPriceCode(price);
    
    // Pass data to view to display list of books
    res.render('shop/list', {layout: 'bookshop', books, page, category, defaultcategoryURL, categoryURL, sort, sortCode, defaultsortURL, sortURL, price, priceCode, defaultpriceURL, priceURL, supplier, author, publisher, search});
};
