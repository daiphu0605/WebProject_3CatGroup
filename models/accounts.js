const connection = require('./connection');

function Result (err, results){
    if (err) throw err;
}

exports.FindUserName = (username) => {
    var sql = "SELECT username FROM hcmus_book_store.user_info WHERE username = '"+ username+"'";
    var results;
    var err;
    connection.query(sql,Result(err, results));

    if (results.length != 0){
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
    var results;
    var err;
    connection.query(sql,Result(err, results));

    if (results.length != 0){
        return true;
    }
    return false;
}