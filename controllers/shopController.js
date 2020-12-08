var express = require("express");
const bookService = require('../models/bookService');

exports.index = async (req, res, next) => {
    //Get current page, default by 1
    const curPage = +req.query.page || 1;

    //Get catogoryID
    const catID = req.query.catogory || "";


    //Get Page infomation
    const page = await bookService.pageNumber(curPage, catID);

    // Get books from model
    const books = await bookService.books(curPage, catID);

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