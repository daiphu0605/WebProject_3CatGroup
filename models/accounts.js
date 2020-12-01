const connection = require('./connection');
var express = require("express");
var router = express.Router();


function Result (err, results){
    if (err) throw err;
}


exports.FindUserName = (username) => {
    var sql = "SELECT username FROM hcmus_book_store.user_info WHERE username = '"+username+"'";
    var results;
    var err;
    connection.query(sql,Result(err, results));

    if (results != null){
        return true;
    }
    return false;
}

exports.AddAccount = (username, password) => {
 var sql = "INSERT INTO hcmus_book_store.user_info (username, password, role) VALUES ";
 sql = sql + "('"+username+"', '"+password+"', 'user')";
 
 connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("1 record inserted");
 })
}

exports.isAccount = (username, password) => {
    var sql = "SELECT * FROM hcmus_book_store.user_info " 
    sql = sql + "WHERE username = '"+username+"' AND password = '"+password+"'";
    var results;
    var err;
    var fields;
    connection.query(sql,Result(err, results));

    if (results != null){
        return true;
    }
    return false;
}