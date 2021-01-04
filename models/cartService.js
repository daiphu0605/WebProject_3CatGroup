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
        });
    });
    
    return result;
}

exports.checkCart = async(oldCart) => {
    cart.items = oldCart.items || {};
    cart.totalQty = oldCart.totalQty || 0;
    cart.totalPrice = oldCart.totalPrice || 0;
    
    return cart;
}

exports.saveNewCart = async(user,cart,name,phone,province,district,ward,address,method) => {
    var sql = "SELECT COUNT(*) FROM hcmus_book_store.order_info;";
    var code = await new Promise ((resolve, reject) => {
        connection.query(sql,(err, result) => {
            if (err) return resolve("error");
            var item = result[0];
            var code = item["COUNT(*)"];
            return resolve(code);
        })
    });

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    var datetime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    if (code != "error"){
        sql = "INSERT INTO hcmus_book_store.order_info VALUES (";
        var value = "'" + code + "', '" + user.username + "', '" + datetime + "', '" + cart.totalPrice + "', '" + name + "', '" + phone + "', '" + province + "', '" + district + "', '" + ward + "', '" + address + "', '" + method + "');";
        sql = sql + value;

        console.log(sql);
        var checkSaveInfo = await new Promise ((resolve, reject) => {
            connection.query(sql,(err, result) => {
                if (err) return resolve("error");    
                return resolve("success");
            })
        });

        if(checkSaveInfo != "error"){
            var mItems = cart.items;

            for (var i in mItems){
                var id = mItems[i].item.id;
                var price = mItems[i].item.base_price;
                var qty = mItems[i].qty;
                sql = "INSERT INTO hcmus_book_store.order_detail VALUES (";
                value = "'" + code + "', '" + id + "', '" + price + "', '" + qty + "', '0');";
                sql = sql + value;
                console.log(sql);
                connection.query(sql,(err, result) => {if (err) return "error";});
            }

            return true;
        }
    }
    else{
        return false;
    }
    
}

exports.removeAll = async(curCart) => {
    var mItems = curCart.items;
    for (var id in mItems){
        delete curCart.items[id];
    }

    curCart.totalQty = 0;
    curCart.totalPrice = 0;

    return curCart;
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
  