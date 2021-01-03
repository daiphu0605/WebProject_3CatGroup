var connection=require('./connection');
var express = require("express");

var cart = {
    items : {},
    totalQty : 0,
    totalPrice : 0,
}

exports.getBookByID = async(BookID) => {
    
    var result = await new Promise ((resolve, reject) => {
        var sql = "SELECT * FROM hcmus_book_store.book_info WHERE id = '" + BookID + "';";
        connection.query(sql,(err, temp) => {
            if (err) return resolve("error");            
            var result = temp[0];
            return resolve(result);
        })
    });
    
    return result;
}

exports.checkCart = async(oldCart) => {
    cart.items = oldCart.items || {};
    cart.totalQty = oldCart.totalQty || 0;
    cart.totalPrice = oldCart.totalPrice || 0;
    
    return cart;
}

async function addct(curCart,Book){
    var storedItem = curCart.items[Book.id];
    if (!storedItem) {
        storedItem = curCart.items[Book.id] = {item: Book, qty: 0, price: 0};
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.base_price * storedItem.qty;
    curCart.totalQty++;
    curCart.totalPrice += storedItem.item.base_price;
    
    return curCart;
}

async function reducect(curCart,id){
    curCart.items[id].qty--;
    curCart.items[id].price -= curCart.items[id].item.base_price;
    curCart.totalQty--;
    curCart.totalPrice -= curCart.items[id].item.base_price;

    if(curCart.items[id].qty <= 0) {
        delete curCart.items[id];
    }
    
    return curCart;
}



exports.add = async(curCart,Book) => {
    curCart = await addct(curCart,Book);
    return curCart;
}

exports.remove = async(curCart,id) => {
    
    curCart.totalQty -= curCart.items[id].qty;
    curCart.totalPrice -= curCart.items[id].price;
    delete curCart.items[id];

    return curCart;
}

exports.reduce = async(curCart,id) => {
    curCart = await reducect(curCart,id);
    
    return curCart;
}
  