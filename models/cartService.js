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

exports.add = async(curCart,Book) => {
    
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
  