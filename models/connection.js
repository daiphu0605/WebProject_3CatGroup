var mysql=require('mysql')

var connection=mysql.createConnection({
    host:'139.180.209.220',
    user:'hcmus_book_store',
    password:'fBGHJJdjS8WaEjJB',
    database:'hcmus_book_store'
  
  }
  )

  
  connection.connect(function(error){
    if (!!error){
        console.log(error)
    }
    else{
        console.log('DB connected...');
    }
  }

  )


  module.exports = connection;