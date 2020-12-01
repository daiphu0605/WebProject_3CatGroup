var connection = require('./connection');


exports.FindUserName = (username) => {
    var sql = "SELECT username FROM hcmus_book_store.user_info WHERE username = '"+ username+"'";
    var Result = [];
    connection.query(sql,(err, results) => {
        if (err) throw err;
        Result = results;
        console.log(results);
    });
    if (Result.length != 0) {
        return true;
    }
    return false;
}

exports.AddAccount = (username, password) => {
 var sql = "INSERT INTO hcmus_book_store.user_info (username, password) VALUES ";
 sql = sql + "('" + username + "', '" + password + "')";
 
 connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("1 record inserted");
 })
}

exports.isAccount = (username, password) => {
    var sql = "SELECT username password FROM hcmus_book_store.user_info " 
    sql = sql + "WHERE username = '"+ username+"' and password = '"+ password+"'";
    var Result = [];
    connection.query(sql,(err, results) => {
        if (err) throw err;
        Result = results;
        console.log(results);
    });
    if (Result.length != 0) {
        return true;
    }
    return false;
}