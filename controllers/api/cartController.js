var cartService = require('../../models/cartService');
const { session } = require('passport');

exports.addCart = async (req, res, next) => {
    res.json(await addBook(req, res, next));
};

exports.saveCart = async (req, res, next) => {
    res.json(await save(req, res, next));
};

exports.removeCart = async (req, res, next) => {
    const id = +req.query.id;
    var temp = req.session.cart ? req.session.cart : {};
    var cart = await cartService.checkCart(temp);

    cart = await cartService.remove(cart,id);
    req.session.cart = cart;
};

exports.increaseCart = async (req, res, next) => {
    res.json(await addBook(req, res, next));
};

exports.reduceCart = async (req, res, next) => {
    res.json(await reduceBook(req, res, next));
};

exports.index = async (req, res, next) => {
    res.json(await getCart(req, res, next));
};

async function save (req, res, next) {
    var temp = req.session.cart ? req.session.cart : {};
    var cart = await cartService.checkCart(temp);
    var user = res.locals.user;
    var name = req.query.name;
    var phone = req.query.phone;
    var province = req.query.province;
    var district = req.query.district;
    var ward = req.query.ward;
    var address = req.query.address;
    var method = req.query.method;

    var check = await cartService.saveNewCart(user,cart,name,phone,province,district,ward,address,method);
    if(check == true){
        cart = await cartService.removeAll(cart);
        req.session.cart = cart;
        return true;
    }
    else{
        return false;
    }
    
    
}

async function getCart (req, res, next) {
    var temp = req.session.cart ? req.session.cart : {};
    var cart = await cartService.checkCart(temp);

    return cart;
}

async function addBook (req, res, next) {
    //Get Id, default by 1
    

    const id = +req.query.id;

    var temp = req.session.cart ? req.session.cart : {};

    var cart = await cartService.checkCart(temp);
    
    // Get book from model
    const book = await cartService.getBookByID(id);

    cart = await cartService.add(cart,book);
    req.session.cart = cart;
    return cart;
};

async function reduceBook (req, res, next) {
    //Get Id, default by 1
    const id = +req.query.id;

    var temp = req.session.cart ? req.session.cart : {};

    var cart = await cartService.checkCart(temp);

    cart = await cartService.reduce(cart,id);
    req.session.cart = cart;
    return cart;
};