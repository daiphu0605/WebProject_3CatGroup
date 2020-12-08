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
<<<<<<< HEAD
    const page = await bookService.pageNumber(curPage);

    // Get books from model
    const books = await bookService.books(curPage);
    console.log(books);
=======

    //Get catogoryID
    const catID = req.query.catogory || "";


    //Get Page infomation
    const page = await bookService.pageNumber(curPage, catID);

    // Get books from model
    const books = await bookService.books(curPage, catID);

>>>>>>> f0715fed349c36ecfe545b2ca667cc262c279e8d
    // Pass data to view to display list of books
    res.render('shop/list', {layout: 'bookshop', books, page});
};

exports.book = async (req, res, next) => {
    //const item = req.body.book_id;
    // Get detailbooks from model
    var BookID = req.params.id;
    const detail = await bookService.getBookByID(BookID);

    res.render('detailBook/detail', {layout: 'detaillayout', detail});
};