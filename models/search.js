var conn = require('./connection');
var SQL = require('./SQL');

exports.Search = async (value) => {
    var sql = new SQL();
    sql.Select("*");
    sql.From("hcmus_book_store.book.book_info");
    sql.Where("title = '" + value + "'or author = '" + value + "' or pulisher = '" + value + "'");
    var Result = await Promise((resolve, reject) => {
        conn.query(sql.Query(),(err,results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
    return Result;
}