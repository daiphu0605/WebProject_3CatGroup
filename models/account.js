const connection = require('./connection');
const SQL = require('./SQL');
const md5 = require('md5')

exports.isAccount = async (username, password, done) => {
    var proc = await new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.Select("username, password");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = '" + username + "'and status = 'Active' or email = '"+ username + "'");
        connection.query(sql.Query(), (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    }).then((user) => {
        if (user.length == 0) {
            return done(null, false, {username: username, ErrorMessage: "Incorrect username"});
        }
        var hashpassword = md5(password);
        if (user[0].password !== hashpassword) {
            return done(null, false, {username: username, ErrorMessage: "Incorrect password"});
        }
        return done(null, user[0]);
    });
}


exports.AddAccount = async (username, password, email, name, done) => {
    var Result = await new Promise((resolve,reject) =>{
        var hashPassword = md5(password);
        var sql = "INSERT INTO hcmus_book_store.user_info (username, password, email, role, status, fullname) VALUES ";
        sql = sql + "('"+username+"', '"+hashPassword+"', '" + email +"', 'user', 'Active', '" + name + "')";
        connection.query(sql, function (err, results) {
            if (err) {
                return reject(err)
            }
            console.log("1 record inserted");
            return resolve(results);
        })
    }).then((results) => {
        var user = {username: username, password: md5(password)};
        return done(null, user);
    }, (results) => {
        return done(results);
    }); 
}

exports.getUserbyName = async (username, done) => {
    var proc = await getUser(username).then((user) => {
        if (user.length == 0) {
            return done(null, false);
        }
        return done(null, user[0]);
    });
}

exports.isUsername = async (username,done) =>{
    var proc = await getUsername(username).then((name) => {
        if (name.length > 0) {
            return done(true);
        }
        return done(false);
    });
}

exports.isEmail  = async (email,done) =>{
    var proc = await getEmail(email).then((result) => {
        if (email.length > 0) {
            return done(true);
        }
        return done(false);
    });
}

exports.getUserInfoByName = async (username, done) => {
    var proc = await getUserInfo(username).then((result) => {
        done(result[0]);
    });
}
exports.checkPassword = async (username, password, done) => {
    var proc = await getUser(username).then((result) => {
        hashPassword = md5(password);
        if (result[0].password !== hashPassword) {
            return done(false);
        }
        return done(true);
    });
}

getUserInfo = (username) => {
    return new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.Select("username, email");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = '" + username + "'and status = 'Active'");
        connection.query(sql.Query(), (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    })
}

getUsername = (username) => {
    return new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.Select("username");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = '" + username + "'and status = 'Active'");
        connection.query(sql.Query(), (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    })
}

getEmail = (email) => {
    return new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.Select("email");
        sql.From("hcmus_book_store.user_info");
        sql.Where("email = '" + email + "'and status = 'Active'");
        connection.query(sql.Query(), (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    })
}

getUser = (username) => {
    return new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.Select("username, password");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = '" + username + "'and status = 'Active'");
        connection.query(sql.Query(), (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    })
}