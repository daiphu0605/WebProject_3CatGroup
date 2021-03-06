var connection=require('./connection');
var express = require("express");



const LIMITED_ITEM_PER_PAGE = 12;

const LIMITED_REVIEW_PER_PAGE = 6;

var pageDetail = {
    currentPage: 1,
    nextPage: 0,
    nextNextPage: 0,
    prevPage: 0,
    prevPrevPage: 0,
    totalPage: 0
}

var pageReviewDetail = {
    currentPage: 1,
    nextPage: 0,
    nextNextPage: 0,
    prevPage: 0,
    prevPrevPage: 0,
    totalPage: 0,
    id: 0
}

var pageDetailAPI = {
    currentPage: 1,
    nextPage: 0,
    nextNextPage: 0,
    prevPage: 0,
    prevPrevPage: 0,
    totalPage: 0,
    search: "",
    category: "",
    sort: "",
    price: "",
    author: "",
    publisher: "",
    supplier: ""
}

async function getBookIDByCatID(catID) {
    var result = await new Promise ((resolve, reject)=>{
        var sql = "SELECT id_book FROM hcmus_book_store.list_categories WHERE id_category = '"+catID+"'";

        connection.query(sql,(err, temp) => {
            if (err) return reject(err);
            return resolve(temp);
        })
    });
    return result;
}

async function getBookIDByCatIDLimit(catID, limit) {
    var result = await new Promise ((resolve, reject)=>{
        var sql = "SELECT id_book FROM hcmus_book_store.list_categories WHERE id_category = '"+catID+"' LIMIT " + limit + ";";

        connection.query(sql,(err, temp) => {
            if (err) return reject(err);
            return resolve(temp);
        })
    });
    return result;
}

async function getTotalPage(search, category, price, author, publisher, supplier){
    var sql = "SELECT COUNT(*) FROM hcmus_book_store.book_info ";
    var bodyStr = await getBodyString(search, category, "", price, author, publisher, supplier);
    sql += bodyStr + ";";

    var result = await new Promise ((resolve, reject)=>{
        connection.query(sql,(err, temp) => {
            if (err) return resolve("error");          

            var item = temp[0];
            var numOfItems = item["COUNT(*)"];
            var result;

            
            if(numOfItems % LIMITED_ITEM_PER_PAGE == 0) {
                result = parseInt(numOfItems / LIMITED_ITEM_PER_PAGE);
            }
            else {
                result = parseInt(numOfItems / LIMITED_ITEM_PER_PAGE) + 1;
            }
            
            return resolve(result);
        })
    });
    return result;
}

async function getTotalPageReview(id){
    var sql = "SELECT COUNT(*) FROM hcmus_book_store.book_reviews ";
    sql += "WHERE book_id = '" + id + "';";

    var result = await new Promise ((resolve, reject)=>{
        connection.query(sql,(err, temp) => {
            if (err) return resolve(null);          

            var item = temp[0];
            var numOfItems = item["COUNT(*)"];
            var result;

            
            if(numOfItems % LIMITED_REVIEW_PER_PAGE == 0) {
                result = parseInt(numOfItems / LIMITED_REVIEW_PER_PAGE);
            }
            else {
                result = parseInt(numOfItems / LIMITED_REVIEW_PER_PAGE) + 1;
            }
            
            return resolve(result);
        })
    });
    return result;
}

async function getSortString(sort){
    var result = "";

    if(sort == ""){
        result = "";
    }
    else if (sort == "popularity"){
        result = "ORDER BY views DESC ";
    }
    else if (sort == "rating"){

    }
    else if (sort == "newest"){
        result = "ORDER BY day_add DESC ";
    }
    else if (sort == "oldest"){
        result = "ORDER BY day_add ASC ";
    }
    else if (sort == "low-high"){
        result = "ORDER BY base_price ASC ";
    }
    else if (sort == "high-low"){
        result = "ORDER BY base_price DESC ";
    }

    return result;
}

async function getCategoryString(category){
    var result = "";


    if(category == "") {
        var result = "";
    }
    else {
        var catID = await getCategoryID(category);
        console.log(catID);

        if (catID != ""){
            var ListBookID = await getBookIDByCatID(catID);
            result = "WHERE id IN (";
            ListBookID.forEach(element => result += "'" + element['id_book'] + "',");
            result = result.substr(0, result.length - 1);
            result += ") ";
        }
    }

    return result;
}

async function getSearchString(whereStr, search){
    var result = "";

    if(search == "") {
        var result = "";
    }
    else {
        search = search.replace("+", " ");
        result = " title LIKE '%" + search + "%' ";
    }

    if(result != ""){
        if(whereStr == "") {
            result = "WHERE " + result;
        }
        else {
            result = "AND " + result;
        }
    }

    return result;
}

async function getPriceString(whereStr, price){
    var result = "";

    if(price == "") {
        var result = "";
    }
    else {
        if(price == "100000") {
            result = "base_price <= '100000' ";
        }
        else if (price == "100000-200000") {
            result = "base_price >= '100000' AND base_price <= '200000' ";
        }
        else if (price == "200000-500000") {
            result = "base_price >= '200000' AND base_price <= '500000' ";
        }
        else if (price == "500000") {
            result = "base_price >= '500000' ";
        }
    }

    if(result != ""){
        if(whereStr == "") {
            result = "WHERE " + result;
        }
        else {
            result = "AND " + result;
        }
    }

    return result;
}

async function getAuthorString(whereStr, author){
    var result = "";

    if(author == "") {
        var result = "";
    }
    else {
        author = author.replace("+", " ");
        result = " author LIKE '%" + author + "%' ";
    }

    if(result != ""){
        if(whereStr == "") {
            result = "WHERE " + result;
        }
        else {
            result = "AND " + result;
        }
    }

    return result;
}

async function getPublisherString(whereStr, publisher){
    var result = "";

    if(publisher == "") {
        var result = "";
    }
    else {
        publisher = publisher.replace("+", " ");
        result = " publisher LIKE '%" + publisher + "%' ";
    }

    if(result != ""){
        if(whereStr == "") {
            result = "WHERE " + result;
        }
        else {
            result = "AND " + result;
        }
    }

    return result;
}

async function getSupplierString(whereStr, supplier){
    var result = "";

    if(supplier == "") {
        var result = "";
    }
    else {
        supplier = supplier.replace("+", " ");
        result = " supplier LIKE '%" + supplier + "%' ";
    }

    if(result != ""){
        if(whereStr == "") {
            result = "WHERE " + result;
        }
        else {
            result = "AND " + result;
        }
    }

    return result;
}


async function getBodyString(search, category, sort, price, author, publisher, supplier){
    var result = "";

    //order by
    var sortStr = await getSortString(sort);

    //where
    var whereStr = "";
    var categoryStr = await getCategoryString(category);
    whereStr += categoryStr;

    var searchStr = await getSearchString(whereStr, search);
    whereStr += searchStr;

    var priceStr = await getPriceString(whereStr, price);
    whereStr += priceStr;

    var authorStr = await getAuthorString(whereStr, author);
    whereStr += authorStr;

    var publisherStr = await getPublisherString(whereStr, publisher);
    whereStr += publisherStr;

    var supplierStr = await getSupplierString(whereStr, supplier);
    whereStr += supplierStr;

    result = whereStr + sortStr;

    return result;
}



async function getSqlString(page, search, category, sort, price, author, publisher, supplier){
    var sql = "SELECT * FROM hcmus_book_store.book_info ";
    var offset = LIMITED_ITEM_PER_PAGE * (page - 1);

    var bodyStr = await getBodyString(search, category, sort, price, author, publisher, supplier);

    sql += bodyStr + "LIMIT "+LIMITED_ITEM_PER_PAGE+" OFFSET "+offset+"";

    sql += ";";
    return sql;
}

exports.getBooks = async(page, search, category, sort, price, author, publisher, supplier) =>{
    var result;
    var sql = await getSqlString(page, search, category, sort, price, author, publisher, supplier);


    result = await new Promise ((resolve, reject)=>{
        connection.query(sql,(err, result) => {
            if (err) return resolve(null);
            return resolve(result);
        })
    });
    return result;
}

exports.pageNumber = async(page, search, category, price, author, publisher, supplier,) =>{
    pageDetail.currentPage = page;
    var temp = await getTotalPage(search, category, price, author, publisher, supplier);
     
    if (temp == "error"){
        pageDetail.totalPage = 1;
    }
    else {
        pageDetail.totalPage = temp;
    }

    if (pageDetail.currentPage < 1) {
        pageDetail.currentPage = 1;
    }

    if (pageDetail.currentPage > pageDetail.totalPage) {
        pageDetail.currentPage = pageDetail.totalPage
    }

    if(pageDetail.currentPage <= 1) {
        pageDetail.prevPage = 0;
    }
    else {
        pageDetail.prevPage = pageDetail.currentPage - 1;
    }

    if(pageDetail.prevPage <= 1) {
        pageDetail.prevPrevPage = 0;
    }
    else {
        pageDetail.prevPrevPage = pageDetail.prevPage - 1;
    }

    if(pageDetail.currentPage >= pageDetail.totalPage) {
        pageDetail.nextPage = 0;
    }
    else {
        pageDetail.nextPage = pageDetail.currentPage + 1;
    }

    if(pageDetail.nextPage >= pageDetail.totalPage || pageDetail.nextPage == 0) {
        pageDetail.nextNextPage = 0;
    }
    else {
        pageDetail.nextNextPage = pageDetail.nextPage + 1;
    }

    return pageDetail;
}

exports.getPageApi = async(page, search, category, sort, price, author, publisher, supplier,) =>{
    pageDetailAPI.currentPage = page;
    var temp = await getTotalPage(search, category, price, author, publisher, supplier);
     
    if (temp == "error"){
        pageDetailAPI.totalPage = 1;
    }
    else {
        pageDetailAPI.totalPage = temp;
    }

    if (pageDetailAPI.currentPage < 1) {
        pageDetailAPI.currentPage = 1;
    }

    if (pageDetailAPI.currentPage > pageDetailAPI.totalPage) {
        pageDetailAPI.currentPage = pageDetailAPI.totalPage
    }

    if(pageDetailAPI.currentPage <= 1) {
        pageDetailAPI.prevPage = 0;
    }
    else {
        pageDetailAPI.prevPage = pageDetailAPI.currentPage - 1;
    }

    if(pageDetailAPI.prevPage <= 1) {
        pageDetailAPI.prevPrevPage = 0;
    }
    else {
        pageDetailAPI.prevPrevPage = pageDetailAPI.prevPage - 1;
    }

    if(pageDetailAPI.currentPage >= pageDetailAPI.totalPage) {
        pageDetailAPI.nextPage = 0;
    }
    else {
        pageDetailAPI.nextPage = pageDetailAPI.currentPage + 1;
    }

    if(pageDetailAPI.nextPage >= pageDetailAPI.totalPage || pageDetailAPI.nextPage == 0) {
        pageDetailAPI.nextNextPage = 0;
    }
    else {
        pageDetailAPI.nextNextPage = pageDetailAPI.nextPage + 1;
    }

    pageDetailAPI.search = search;
    pageDetailAPI.category = category;
    pageDetailAPI.sort = sort;
    pageDetailAPI.price = price;
    pageDetailAPI.publisher = publisher;
    pageDetailAPI.author = author;
    pageDetailAPI.supplier = supplier;

    return pageDetailAPI;
}

exports.getPageReview = async(id,page) =>{
    pageReviewDetail.currentPage = page;
    var temp = await getTotalPageReview(id);
    pageReviewDetail.id = id;
     
    if (temp == null){
        pageReviewDetail.totalPage = 0;
    }
    else {
        pageReviewDetail.totalPage = temp;
    }

    if (pageReviewDetail.currentPage < 1) {
        pageReviewDetail.currentPage = 1;
    }

    if (pageReviewDetail.currentPage > pageReviewDetail.totalPage) {
        pageReviewDetail.currentPage = pageReviewDetail.totalPage
    }

    if(pageReviewDetail.currentPage <= 1) {
        pageReviewDetail.prevPage = 0;
    }
    else {
        pageReviewDetail.prevPage = pageReviewDetail.currentPage - 1;
    }

    if(pageReviewDetail.prevPage <= 1) {
        pageReviewDetail.prevPrevPage = 0;
    }
    else {
        pageReviewDetail.prevPrevPage = pageReviewDetail.prevPage - 1;
    }

    if(pageReviewDetail.currentPage >= pageReviewDetail.totalPage) {
        pageReviewDetail.nextPage = 0;
    }
    else {
        pageReviewDetail.nextPage = pageReviewDetail.currentPage + 1;
    }

    if(pageReviewDetail.nextPage >= pageReviewDetail.totalPage || pageReviewDetail.nextPage == 0) {
        pageReviewDetail.nextNextPage = 0;
    }
    else {
        pageReviewDetail.nextNextPage = pageReviewDetail.nextPage + 1;
    }

    return pageReviewDetail;
}

exports.getReviews = async(id, page) =>{
    var offset = LIMITED_REVIEW_PER_PAGE * (page - 1);
    var sql = "SELECT * FROM hcmus_book_store.book_reviews ";
    sql += "WHERE book_id = '" + id + "' ORDER BY preview_id DESC LIMIT " + LIMITED_REVIEW_PER_PAGE + " OFFSET " + offset + ";";

    var result = await new Promise ((resolve, reject)=>{
        connection.query(sql,(err, result) => {
            if (err) return resolve(null);
            return resolve(result);
        })
    });
    return result;
}

exports.getBookByID = async(BookID) => {
    
    var result = await new Promise ((resolve, reject) => {
        var sql = "SELECT * FROM hcmus_book_store.book_info WHERE id = '" + BookID + "';";
        connection.query(sql,(err, temp) => {
            if (err) return resolve("error");            
            var result = temp[0];
            return resolve(result);
        })
    });

    await increaseView(BookID);

    return result;
}

exports.getRelatedBook = async(BookID) => {
    
    var catID = await new Promise ((resolve, reject) => {
        var sql = "SELECT id_category FROM hcmus_book_store.list_categories WHERE id_book = '" + BookID + "';";
        connection.query(sql,(err, temp) => {
            if (err) return resolve(null);            
            var result = temp[0];
            return resolve(result);
        })
    });


    if(catID != null){
        var ListBookID = await getBookIDByCatIDLimit(catID.id_category,8);
        
        sql = "SELECT * FROM hcmus_book_store.book_info WHERE id IN (";
        var count = 0;
        for(var i in ListBookID){
            if(ListBookID[i].id_book != BookID){
                count++;
                sql +=  "'" + ListBookID[i].id_book + "',";
            }
        }
        sql = sql.substr(0, sql.length - 1);
        sql += ");";
        
        if(count > 0) {
            var result = await new Promise ((resolve, reject)=>{
                connection.query(sql,(err, result) => {
                    if (err) return resolve("error");
                    return resolve(result);
                })
            });
            return result;
        }
        else {
            return null;
        }

    }
    else{
        return null;
    }
}

async function increaseView(BookID){

    var bookView = await new Promise ((resolve, reject) => {
        var sql = "SELECT views FROM hcmus_book_store.book_info WHERE id = '" + BookID + "';";
        connection.query(sql,(err, temp) => {
            if (err) return resolve("error");
            var item = temp[0];            
            var result = item['views'];
            return resolve(result);
        })
    });

    if (bookView != "error") {
        var view = parseInt(bookView);
        if (view != NaN) {
            view++;
            var sql = "UPDATE hcmus_book_store.book_info SET views = '" + view + "' WHERE (id = '" + BookID +"');";
            connection.query(sql,(err, temp) => { if (err) return "error"; });
        }
    }
}


exports.getURL = async(search, category, sort, price, author, publisher, supplier, mode) => {
    var urlString = "/shop";
    var flag = 0;

    if (mode == 0) {
        search = "";
    }
    else if (mode == 1) {
        category = "";
    }
    else if (mode == 2) {
        sort = "";
    }
    else if (mode == 3) {
        price = "";
    }
    else if (mode == 4) {
        author = "";
    }
    else if (mode == 5) {
        publisher = "";
    }
    else if (mode == 6) {
        supplier = "";
    }

    if (search != "") {
        urlString += "?search=" + search;
        flag++;
    }

    if (category != "") {
        if (flag > 0) {
            urlString += "&category=" + category;
        }
        else {
            urlString += "?category=" + category;
        }
        flag++;
    }

    if (sort != "") {
        if (flag > 0) {
            urlString += "&sort=" + sort;
        }
        else {
            urlString += "?sort=" + sort;
        }
        flag++;
    }

    if (price != "") {
        if (flag > 0) {
            urlString += "&price=" + price;
        }
        else {
            urlString += "?price=" + price;
        }
        flag++;
    }

    if (author != "") {
        if (flag > 0) {
            urlString += "&author=" + author;
        }
        else {
            urlString += "?author=" + author;
        }
        flag++;
    }

    if (publisher != "") {
        if (flag > 0) {
            urlString += "&publisher=" + publisher;
        }
        else {
            urlString += "?publisher=" + publisher;
        }
        flag++;
    }

    if (supplier != "") {
        if (flag > 0) {
            urlString += "&supplier=" + supplier;
        }
        else {
            urlString += "?supplier=" + supplier;
        }
        flag++;
    }

    if (flag > 0) {
        urlString += "&";
    }
    else {
        urlString += "?";
    }

    return urlString;
}

exports.getSortCode = async(sort) => {

    var code = 0;

    if (sort == ""){
        code = 0;
    }
    else if (sort == "popularity"){
        code = 1;
    }
    else if (sort == "rating"){
        code = 2;
    }
    else if (sort == "newest"){
        code = 3;
    }
    else if (sort == "oldest"){
        code = 4;
    }
    else if (sort == "low-high"){
        code = 5;
    }
    else if (sort == "high-low"){
        code = 6;
    }
    return code;
}

exports.getPriceCode = async(price) => {

    var code = 0;

    if (price == ""){
        code = 0;
    }
    else if (price == "100000"){
        code = 1;
    }
    else if (price == "100000-200000"){
        code = 2;
    }
    else if (price == "200000-500000"){
        code = 3;
    }
    else if (price == "500000"){
        code = 4;
    }

    return code;
}

async function getCategoryID(category){
    var result = "";

    if(category == "novel"){
        result = "C01";
    }
    else if (category == "foreign-book"){
        result = "C02";
    }
    else if (category == "education"){
        result = "C03";
    }
    else if (category == "language"){
        result = "C04";
    }
    else if (category == "light-novel"){
        result = "C05";
    }
    else if (category == "business"){
        result = "C06";
    }
    else if (category == "fiction"){
        result = "C07";
    }
    else if (category == "history"){
        result = "C08";
    }
    else if (category == "geography"){
        result = "C09";
    }
    else if (category == "horror"){
        result = "C10";
    }
    else if (category == "textbook"){
        result = "C11";
    }
    else if (category == "romance"){
        result = "C12";
    }
    else if (category == "sport"){
        result = "C13";
    }
    else if (category == "food"){
        result = "C14";
    }
    else if (category == "music"){
        result = "C15";
    }
    else if (category == "science"){
        result = "C16";
    }
    else if (category == "mentality"){
        result = "C17";
    }
    else if (category == "art"){
        result = "C18";
    }
    else if (category == "children"){
        result = "C19";
    }
    
    return result;
}

exports.addReview = async(id,review,user) => {
    var sql = "SELECT COUNT(*) FROM hcmus_book_store.book_reviews;";
    var code = await new Promise ((resolve, reject) => {
        connection.query(sql,(err, result) => {
            if (err) return resolve(null);
            var item = result[0];
            var code = item["COUNT(*)"];
            return resolve(code);
        })
    });

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    var datetime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    var tempuser;
    if (code != null){
        sql = "SELECT * FROM hcmus_book_store.user_info WHERE username = '" + user.username + "';";
        tempuser = await new Promise ((resolve, reject) => {
            connection.query(sql,(err, result) => {
                if (err) return resolve(null);
                var temp = result[0];    
                return resolve(temp);
            })
        });
    }

    var result;
    if (tempuser != null){
        sql = "INSERT INTO hcmus_book_store.book_reviews VALUES (";
        sql += "'" + id + "', '" + code + "', '" + tempuser.fullname + "', '" + review + "', '" + datetime + "', '" + tempuser.avatar + "');";
        var checkSaveInfo = await new Promise ((resolve, reject) => {
            connection.query(sql,(err, result) => {
                if (err) return resolve("error");    
                return resolve("success");
            })
        });
        
        if(checkSaveInfo == "error"){
            result = false;
        }
        else{
            result = true;
        }
    }
    else{
        result = false;
    }

    return result;
    
}

exports.getBooksAndString = async(books) => {
    var result = new Array();
    var count = 0;
    for (var i in books) {
        var str = await removeVietnameseTones(books[i].title);
        
        str = str.replace(/ /g,"-");

        result[count] = {book: books[i],  str: str};
        count++;
    }
    return result;
}

async function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    // Remove extra spaces
    str = str.replace(/\s+/g, " ").trim();
   
    return str;
}


