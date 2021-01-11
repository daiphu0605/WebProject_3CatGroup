var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require( 'express-handlebars' );
var passport = require('./passport/passport');
var session = require("express-session");
const dotenv = require("dotenv");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const shopRouter = require('./routes/shop');
const cartRouter = require('./routes/cart');
const checkoutRouter = require('./routes/checkout');

var signIn = require('./routes/sign_in');
var signUp = require('./routes/sign_up');
var signOut = require('./routes/sign_out');
var forgetPass = require('./routes/forget_password');
var verify = require('./routes/verify');

//api
var apiShop = require('./routes/api/shop');
var apiCart = require('./routes/api/cart');

///////////
var app = express();
var connection=require('./models/connection');
//


//dotenv
require("dotenv").config({
  path: path.resolve(__dirname, "./.env"),
});

// view engine setup
app.engine('hbs', hbs({ 
  extname: 'hbs', 
  defaultLayout: false, 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//passport
app.use(session({ 
  secret: 'anything', 
  resave: true, 
  saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
  res.locals.user = req.user;
  res.locals.cart = req.session.cart;
  next();
})

////main router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shop', shopRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);


app.use('/signin?', signIn);
app.use('/signup?', signUp);
app.use('/signout', signOut);
app.use('/forget', forgetPass);
app.use('/verify', verify);
//api
app.use('/api/shop', apiShop);
app.use('/api/cart', apiCart);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
