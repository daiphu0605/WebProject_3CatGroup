var express = require("express");
var cartService = require('../models/cartService');

exports.index = async (req, res, next) => {
    var temp = req.session.cart ? req.session.cart : {};
    var cart = await cartService.checkCart(temp);
    
    res.render('cart/cart_list', {layout: 'cart_main_layout', cart});
};
