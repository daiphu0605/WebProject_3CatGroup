const connection = require('./connection');
const SQL = require('./SQL');
const md5 = require('md5')

exports.isAccount = async (username, password) => {
    var Result = await new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.select("username, password");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = " + username);
        connection.query(sql, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
    if (Result.length == 0) {
        return "Incorrect username";
    }
    var hashPassword = md5(password);
    if (Result.password !== hashPassword) {
        return "Incorrect password";
    }
    return Result;
}

exports.isUsername = async (username) => {
    var Result = await new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.select("username");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = " + username);
        connection.query(sql, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
    if (Result.length == 0) {
        return false;
    }
    return true;
}

exports.AddAccount = (username, password) => {
    var hashPassword = md5(password);
    var sql = "INSERT INTO hcmus_book_store.user_info (username, password, role) VALUES ";
    sql = sql + "('"+username+"', '"+hashPassword+"', 'user')";

    connection.query(sql, function (err, results) {
        if (err) throw err;
        console.log("1 record inserted");
    })
}

exports.getUserByName = async (username) => {
    var Result = await new Promise((resolve, reject) => {
        var sql = new SQL();
        var sql = new SQL();
        sql.select("username, password");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = " + username);
        connection.query(sql, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
    if (Result.length == 0) {
        return false;
    }
    return Result;
}