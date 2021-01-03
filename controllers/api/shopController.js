var bookService = require('../../models/bookService');
var search = require('../../models/search');

exports.bookapi = async (req, res, next) => {
    res.json(await getbook(req, res, next));
}

exports.pageapi = async (req, res, next) => {
    res.json(await getpage(req, res, next));
}

async function getbook (req, res, next) {
    //Get current page, default by 1
    const curPage = +req.query.page || 1;

    //Get Search
    const search = req.query.search || "";

    //Get catogoryID
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

    // Get books from model
    const books = await bookService.getBooks(curPage, search, category, sort, price, author, publisher, supplier,);


    return books;
};

async function getpage (req, res, next) {
    //Get current page, default by 1
    const curPage = +req.query.page || 1;

    //Get Search
    const search = req.query.search || "";

    //Get catogoryID
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
    const page = await bookService.getPageApi(curPage, search, category, sort, price, author, publisher, supplier,);

    return page;
};

exports.oldbookapi = async (req, res, next) => {
    res.json(await getbook(req, res, next))
}
