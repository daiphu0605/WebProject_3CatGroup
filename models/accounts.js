var connection = require('./connection');

exports.FindUserName = async (username) => {
    const Result = GetUsername(username);
    return Result;
}

exports.AddAccount = (username, password) => {
 var sql = "INSERT INTO hcmus_book_store.user_info (username, password) VALUES ";
 sql = sql + "('" + username + "', '" + password + "')";
 
 connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("1 record inserted");
 })
}

exports.isAccount = async (username, password) => {
    const Result = GetAcc(username,password);
    return Result;
    /*async () => {
        try{
            let Results = await GetAcc(username, password);
            if (Results !=0 ){
            return true;
            }
            else {
                return false;
            }
        }
        catch (err)
        {
            throw err;
        };
    }
    return bool;*/
}   

async function GetAcc (username, password) {
    var Result = await new Promise ((resolve, reject)=>{
        var sql = "SELECT username, password FROM hcmus_book_store.user_info " 
        sql = sql + "WHERE username = '"+ username +"' and password = '"+ password +"';";
        connection.query(sql,(err, results) => {
            if (err) return reject(err);
            var len = results.length;
            return resolve(len)
        })
    });
    return Result;
}

async function GetUsername(username){
    var Result = await new Promise ((resolve, reject)=>{
            var sql = "SELECT username FROM hcmus_book_store.user_info WHERE username = '"+ username+"'";
            connection.query(sql,(err, results) => {
            if (err) return reject(err);
            return resolve(results.length);
        })
    });
    return Result;
}






//Result.length != 0