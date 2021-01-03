var cartService = require('../../models/cartService');
var bookService = require('../../models/bookService');
const { session } = require('passport');

exports.addCart = async (req, res, next) => {
    res.json(await addBook(req, res, next));
};

async function addBook (req, res, next) {
    //Get Id, default by 1
    

    const id = +req.query.id || 1;

    var temp = req.session.cart ? req.session.cart : {};

    var cart = await cartService.checkCart(temp);
    
    // Get book from model
    const book = await cartService.getBookByID(id);

    cart = await cartService.add(cart,book);
    req.session.cart = cart;
    return cart;
};