var express = require("express");
var cartService = require('../models/cartService');

exports.index = async (req, res, next) => {
    var temp = req.session.cart ? req.session.cart : {};
    var cart = await cartService.checkCart(temp);
    
    res.render('cart/cart_list', {layout: 'cart_main_layout', cart});
};

exports.checkout = async (req, res, next) => {
    var temp = req.session.cart ? req.session.cart : {};
    var cart = await cartService.checkCart(temp);
    
    res.render('cart/cart_shipping_form', {layout: 'cart_main_layout', cart});
};

exports.history = async (req, res, next) => {
    var user = res.locals.user;
    var history;
    if(user != null){
        history = await cartService.getHistory(user.username);
    }
    else{
        history = null;
    }
    
    res.render('cart/cart_history_list', {layout: 'cart_sub_layout', history});
};

exports.historyid = async (req, res, next) => {
    //get user
    var user = res.locals.user;
    //get cart id
    var cartId = req.params.id;

    var cart_history;
    if(user != null){
        cart_history = await cartService.getHistoryById(cartId);
    }
    else{
        cart_history = null;
    }
    
    res.render('cart/cart_list_view', {layout: 'sub_sub_layout', cart_history});
};