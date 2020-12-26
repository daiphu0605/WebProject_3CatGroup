var express = require("express");
var bookService = require('../models/bookService');
var search = require('../models/search');
//const Page = require('./PageWeb');

async function Search(req, res, next){
    var value = req.query.search;
    var page = 1;
    //let amount = search.Amount(value);
    //let totalPage = page.TotalPage(amount);
    let books = search.Search(value, 1, 12);
    books.then(function(result){
        res.render('shop/list', {layout: 'bookshop', books: result, page});
    });

}

exports.Shop = (req,res,next) => {
    var value = req.query.search;
    if (value == null)
    {
        index(req,res,next);
    }
    else
    {
        Search(req,res,next);
    }
}

async function index (req, res, next) {
    //Get current page, default by 1
    const curPage = +req.query.page || 1;

    //Get catogoryID
    const category = req.query.category || "";

    //Get Sort type
    const sort = req.query.sort || "";

    //Get price
    const price = req.query.price || "";

    //Get Author
    const author = req.query.author || "";

    //Get publisher
    const publisher = req.query.publisher || "";

    //Get Page infomation
    const page = await bookService.pageNumber(curPage, category);

    // Get books from model
    const books = await bookService.books(page.currentPage, category);

    //get new url
    const categoryURL = await bookService.getCategoryURL(sort, price, author, publisher);
    const defaultcategoryURL = categoryURL.substring(0,categoryURL.length-1);

    const sortURL = await bookService.getSortURL(category, price, author, publisher);
    const defaultsortURL = sortURL.substring(0,sortURL.length-1);

    const priceURL = await bookService.getPriceURL(category, sort, author, publisher);
    const defaultpriceURL = priceURL.substring(0,priceURL.length-1);

    const authorURL = await bookService.getAuthorURL(category, sort, price, publisher);
    const defaultauthorURL = authorURL.substring(0,authorURL.length-1);

    const publisherURL = await bookService.getPublisherURL(category, sort, price, author);
    const defaultpublisherURL = categoryURL.substring(0,publisherURL.length-1);

    const sortCode = await bookService.getSortCode(sort);
    const priceCode = await bookService.getPriceCode(price);
    
    // Pass data to view to display list of books
    res.render('shop/list', {layout: 'bookshop', books, page, category, defaultcategoryURL, categoryURL, sortCode, defaultsortURL, sortURL, priceCode, defaultpriceURL, priceURL});
};

exports.book = async (req, res, next) => {
    //const item = req.body.book_id;
    // Get detailbooks from model
    var BookID = req.params.id;
    const detail = await bookService.getBookByID(BookID);

    res.render('detailBook/detail', {layout: 'detaillayout', detail});
};

