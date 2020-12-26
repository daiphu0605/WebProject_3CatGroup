var connection=require('./connection');
var express = require("express");



const LIMITED_ITEM_PER_PAGE = 12;

var pageDetail = {
    currentPage: 1,
    nextPage: 0,
    nextNextPage: 0,
    prevPage: 0,
    prevPrevPage: 0,
    totalPage: 0
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

async function getTotalPage(){
    var result = await new Promise ((resolve, reject)=>{
        var sql = "SELECT COUNT(*) FROM hcmus_book_store.book_info";
        connection.query(sql,(err, temp) => {
            if (err) return reject(err);            

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

async function getSortString(sort){
    var result = "";

    if(sort == ""){
        result = "";
    }
    else if (sort == "popularity"){
    }
    else if (sort == "rating"){
    }
    else if (sort == "newest"){
    }
    else if (sort == "oldest"){
    }
    else if (sort == "low-high"){
        result = "ORDER BY base_price ASC ";
    }
    else if (sort == "high-low"){
        result = "ORDER BY base_price DESC ";
    }

    return result;
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


async function getSqlString(page, category, sort){
    var sql = "SELECT * FROM hcmus_book_store.book_info ";
    var offset = LIMITED_ITEM_PER_PAGE * (page - 1);

    var categoryStr = await getCategoryString(category);
    var sortStr = await getSortString(sort);
    

    sql += categoryStr + sortStr + "LIMIT "+LIMITED_ITEM_PER_PAGE+" OFFSET "+offset+"";

    sql += ";";
    return sql;
}

exports.getBooks = async(page, category, sort) =>{
    var result;
    var sql = await getSqlString(page, category, sort);


    result = await new Promise ((resolve, reject)=>{
        connection.query(sql,(err, result) => {
            if (err) return reject(err);
            return resolve(result);
        })
    });

    /*if(category != "") {

        var ListBookID = await getBookIDByCatID(catID);
        result = await new Promise ((resolve, reject)=>{
            var sql = "SELECT * FROM hcmus_book_store.book_info WHERE id IN (";
            ListBookID.forEach(element => sql += "'" + element['id_book'] + "',");
            sql = sql.substr(0, sql.length - 1);
            sql = sql + ") LIMIT " + LIMITED_ITEM_PER_PAGE + " OFFSET " + offset + ";";

            connection.query(sql,(err, result) => {
                if (err) return reject(err);
                return resolve(result);
            })

        });
    }
    else {
        result = await new Promise ((resolve, reject)=>{
            var sql = "SELECT * FROM hcmus_book_store.book_info LIMIT "+LIMITED_ITEM_PER_PAGE+" OFFSET "+offset+"";

            connection.query(sql,(err, result) => {
                if (err) return reject(err);
                return resolve(result);
            })
        });
    }*/
    
    return result;
}

exports.pageNumber = async(page, catID) =>{
    pageDetail.currentPage = page;
    pageDetail.totalPage = await getTotalPage(catID);


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

exports.getBookByID = async(BookID) =>{
    
    var result = await new Promise ((resolve, reject) => {
        var sql = "SELECT * FROM hcmus_book_store.book_info WHERE id = '" + BookID + "';";
        connection.query(sql,(err, temp) => {
            if (err) return reject(err);
            var result = temp[0];
            return resolve(result);
        })
    });
    return result;
}

exports.getCategoryURL = async(sort, price, author, publisher) => {

    var urlString = "/shop";
    var flag = 0;

    if (sort != "") {
        urlString += "?sort=" + sort;
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

    if (flag > 0) {
        urlString += "&";
    }
    else {
        urlString += "?";
    }

    return urlString;
}

exports.getSortURL = async(category, price, author, publisher) => {

    var urlString = "/shop";
    var flag = 0;

    if (category != "") {
        urlString += "?category=" + category;
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

    if (flag > 0) {
        urlString += "&";
    }
    else {
        urlString += "?";
    }

    return urlString;
}

exports.getPriceURL = async(category, sort, author, publisher) => {

    var urlString = "/shop";
    var flag = 0;

    if (category != "") {
        urlString += "?category=" + category;
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

    if (flag > 0) {
        urlString += "&";
    }
    else {
        urlString += "?";
    }

    return urlString;
}

exports.getAuthorURL = async(category, sort, price, publisher) => {

    var urlString = "/shop";
    var flag = 0;

    if (category != "") {
        urlString += "?category=" + category;
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

    if (publisher != "") {
        if (flag > 0) {
            urlString += "&publisher=" + publisher;
        }
        else {
            urlString += "?publisher=" + publisher;
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

exports.getPublisherURL = async(category, sort, price, author) => {

    var urlString = "/shop";
    var flag = 0;

    if (category != "") {
        urlString += "?category=" + category;
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
