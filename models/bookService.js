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

async function getBooks(page, catID){
    var result;
    var offset = LIMITED_ITEM_PER_PAGE * (page - 1);
    if(catID != "") {
        var ListBookID = await getBookIDByCatID(catID);
        result = await new Promise ((resolve, reject)=>{
            var sql = "SELECT * FROM hcmus_book_store.book_info WHERE id IN (";
            ListBookID.forEach(element => sql += "'" + element['id_book'] + "',");
            sql = sql.substr(0, sql.length - 1);
            sql = sql + ") LIMIT " + LIMITED_ITEM_PER_PAGE + " OFFSET " + offset + ";";

            console.log(sql);

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
    }
    
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

exports.books = async(page, catID) =>{
    const listBooks = await getBooks(page, catID);
    return listBooks;
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
