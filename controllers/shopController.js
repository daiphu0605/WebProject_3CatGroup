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
    const page = await bookService.pageNumber(curPage);

    // Get books from model
    const books = await bookService.books(curPage);
    console.log(books);
    // Pass data to view to display list of books
    res.render('shop/list', {layout: 'bookshop', books, page});
};

exports.book = (req, res, next) => {
    //const item = req.body.book_id;
    // Get detailbooks from model
    const detailbooks = bookModel.list;

    const detail = detailbooks[parseInt(req.params.id)]; 

    // Pass data to view to display list of books
    res.render('detailBook/detail', {layout: 'detaillayout', detail});
};