const connection = require('./connection');
const SQL = require('./SQL');
const md5 = require('md5');
const nodemailer = require("nodemailer");
const crypto = require('crypto');

exports.sentVerifyEmail = async (username, host, email) => {

    var verifyid = await new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.Select("verify_id");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = '" + username + "'and verify_status = 'Block'");
        connection.query(sql.Query(), (err, results) => {
            if (err) return resolve(null);
            var id;
            if(results.length == 1){
                id = results[0];
                id = id["verify_id"];
            }
            return resolve(id);
        });
    })

    if(verifyid != null){
        //var rand = Math.floor((Math.random() * 100) + 54);
        var link = "http://"+host+"/verify?id="+verifyid;

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SHOP_GMAIL,
                pass: process.env.SHOP_PASS
            }
        });

        var mailOptions={
            from : process.env.SHOP_GMAIL,
            to : email,
            subject : "Please confirm your Email account",
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
        }
        
        transporter.sendMail(mailOptions, function(error, response){
        if(error){
                console.log(error);
            res.end("error");
        }else{
                console.log("Message sent: " + response.message);
            res.end("sent");
            }
        });
    }

}

exports.verifyEmail = async (id) => {
    var user = await new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.Select("*");
        sql.From("hcmus_book_store.user_info");
        sql.Where("verify_id = '" + id + "'");
        connection.query(sql.Query(), (err, results) => {
            if (err) return resolve(null);
            var user;
            if(results.length == 1){
                user = results[0];
            }
            else{
                user = null;
            }
            return resolve(user);
        });
    });
    if(user != null){
        var sql = "UPDATE hcmus_book_store.user_info SET verify_status = 'Active' WHERE (verify_id = '" + id +"');";
        connection.query(sql,(err, temp) => { if (err) return "error"; });
    }

    return user;
}


exports.isAccount = async (username, password, done) => {
    var proc = await new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.Select("username, password");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = '" + username + "' and status = 'Active' and verify_status = 'Active' or email = '"+ username + "'");
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
    // Defining key 
    const key = crypto.randomBytes(32); 
    
    // Defining iv 
    const iv = crypto.randomBytes(16); 

    let cipher = crypto.createCipheriv( 
        'aes-256-cbc', Buffer.from(key), iv); 

    var encrypted = cipher.update(username);
    encrypted += cipher.final('hex');

    var Result = await new Promise((resolve,reject) =>{
        var hashPassword = md5(password);

        var sql = "INSERT INTO hcmus_book_store.user_info (username, password, email, role, fullname, verify_id) VALUES ";
        sql = sql + "('"+username+"', '"+hashPassword+"', '" + email +"', 'user', '" + name + "', '"+ encrypted + "');";
        
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
        if (result.length > 0) {
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


exports.updateUserInfo = async (user,done)=>{
    var proc = await new Promise((resolve, reject) => {
        var sql = "UPDATE hcmus_book_store.user_info";
        sql += " SET";
        if (user.email !== null) {
            sql += " email = '" + user.email +"'";
        }
        if (user.fullname !== null) {
            sql += " fullname = '" + user.fullname +"'";
        }
        sql += " WHERE username = '" + user.username +"'";
        connection(sql, (err,result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    }).then((result) => {
        return done(true);
    }, (err) => {
        return done(false);
    });
}

exports.updatePasswords = async (username, newPassword, done) => {
    var proc = await new Promise ((resolve, reject) => {
        var sql;
        var hashPassword = md5(newPassword)
        sql = "UPDATE hcmus_book_store.user_info";
        sql += " SET password = '" + hashPassword +"'";
        sql += " WHERE username = '" + username + "'";
        connection.query(sql, (err, result) => {
            if (err) { 
                return reject(err);
            }
            return resolve(result);
        });
    }).then((result) => {
        return done(true);
    }, (err) => {
        return done(false);
    });
}

exports.updatePasswordByEmail = async (email, password, done) => {
    var proc = await new Promise ((resolve, reject) => {
        var sql;
        var hashPassword = md5(newPassword)
        sql = "UPDATE hcmus_book_store.user_info";
        sql += " SET password = '" + hashPassword +"'";
        sql += " WHERE email = '" + email + "'";
        connection.query(sql, (err, result) => {
            if (err) { 
                return reject(err);
            }
            return resolve(result);
        });
    }).then((result) => {
        return done(true);
    }, (err) => {
        return done(false);
    });
}

getUserInfo = (username) => {
    return new Promise((resolve, reject) => {
        var sql = new SQL();
        sql.Select("username, email");
        sql.From("hcmus_book_store.user_info");
        sql.Where("username = '" + username + "'and status = 'Active'  and verify_status = 'Active'");
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
        sql.Where("username = '" + username + "'");
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
        sql.Where("email = '" + email + "'");
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
        sql.Where("username = '" + username + "'and status = 'Active' and verify_status = 'Active'");
        connection.query(sql.Query(), (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    })
}