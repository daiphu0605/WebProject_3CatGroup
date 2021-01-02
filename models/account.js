const connection = require('./connection');
const SQL = require('./SQL');
const md5 = require('md5')

exports.isAccount = async (username, password) => {
    var Result;
    var p = await new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.Select("username, password");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = '" + username + "'");
        connection.query(sql.Query(), (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    }).then((result) => {
        Result = result;
    })
    if (Result.length == 0) {
        return "Incorrect username";
    }
    var hashPassword = md5(password);
    if (Result[0].password !== hashPassword) {
        return "Incorrect password";
    }
    return Result[0];
}

exports.isUsername = async (username) => {
    var Result = await new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.Select("username");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = '" + username + "'");
        connection.query(sql.Query(), (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
    if (Result.length == 0) {
        return false;
    }
    return true;
}

exports.AddAccount = async (username, password) => {
    var Result = await new Promise((resolve,reject) =>{
        var hashPassword = md5(password);
        var sql = "INSERT INTO hcmus_book_store.user_info (username, password, role, status) VALUES ";
        sql = sql + "('"+username+"', '"+hashPassword+"', 'user', 'Active')";
        connection.query(sql, function (err, results) {
            if (err) {
                return reject(err)
            }
            console.log("1 record inserted");
            return resolve(results);
        })
    }); 
    return Result;
}

exports.getUserByName = async (username) => {
    var Result;
    var p = await new Promise((resolve, reject) => {
        var sql = new SQL();
        var sql = new SQL();
        sql.Select("username, password");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = '" + username + "'");
        connection.query(sql.Query(), (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    }).then((result) => {
        Result = result;
    });
    if (Result.length == 0) {
        return false;
    }
    return Result[0];
}