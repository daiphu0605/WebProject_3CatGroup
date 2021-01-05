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

exports.addreviewapi = async (req, res, next) => {
    res.json(await addreview(req, res, next))
}

exports.reviewapi = async (req, res, next) => {
    res.json(await getreview(req, res, next))
}

async function getreview (req, res, next) {
    //Get review
    const id = req.query.id || "";
    const page = +req.query.page || 1;


    var result;
    var reviews = await bookService.getReviews(id, page);
   
    if(reviews != null){
        var mypage = await bookService.getPageReview(id, page);
        result = {reviews: reviews, page: mypage};
        console.log(mypage);
    }
    else{
        result = null;
    }

    return result;
};

async function addreview (req, res, next) {
    //Get review
    const id = req.query.id || "";
    const review = req.query.review || "";
    var temp = review.replace(" ","");
    var user = res.locals.user;

    var result;
    if (user.username!=null){
        if(temp != "") {
            var check = await bookService.addReview(id,review,user);
            if (check == true){
                var reviews = await bookService.getReviews(id, 1);
                if(reviews != null){
                    var page = await bookService.getPageReview(id,1);
                    result = {reviews: reviews, page: page};
                }
                else{
                    result = null;
                }
            }
            else{
                result = null;
            }
        }
        else{
            result = null;
        }
    }
    else{
        result = null;
    }

    return result;
};
