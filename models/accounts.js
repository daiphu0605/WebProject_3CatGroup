
var connection = require('./connection');





exports.FindUserName = (username) => {
    var sql = "SELECT username FROM hcmus_book_store.user_info WHERE username = '"+ username+"'";
    nResults = connection.query(sql,(err, results) => {
        if (err) throw err;
        //console.log(results);
    }).__proto__._handleFinalResultPacket.length;
    if (nResults != 0) {
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

    var sql = "SELECT username, password FROM hcmus_book_store.user_info " 
    sql = sql + "WHERE username = '"+ username +"' and password = '"+ password +"';";
    //sql = sql + "WHERE username = 'hlnam' and password = '123';";
    var nResults = 0;

    nResults = connection.query(sql,(err, results) => {
        if (err) throw err;
        //console.log(results);
    }).__proto__._handleFinalResultPacket.length;
    if (nResults != 0) {
        return true;
    }
    return false;
}

//Result.length != 0