var bookService = require('../../models/bookService');
var search = require('../../models/search');

exports.bookapi = async (req, res, next) => {
    res.json(await getbook(req, res, next))
}

exports.pageapi = async (req, res, next) => {
    res.json(await getpage(req, res, next))
}

async function getbook (req, res, next) {
    //Get current page, default by 1
    const curPage = +req.query.page || 1;

    //Get catogoryID
    const catID = req.query.catogory || "";

    // Get books from model
    const books = await bookService.books(curPage, catID);

    return books;
};

async function getpage (req, res, next) {
    //Get current page, default by 1
    const curPage = +req.query.page || 1;

    //Get catogoryID
    const catID = req.query.catogory || "";


    //Get Page infomation
    const page = await bookService.pageNumber(curPage, catID);

    return page;
};

exports.oldbookapi = async (req, res, next) => {
    res.json(await getbook(req, res, next))
}
