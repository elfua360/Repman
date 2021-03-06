"use strict"
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var vm = require('v-response');
var config = require('config');
var logger = require('morgan');
//var session = require('express-session');
//var connectStore = require('connect-mongo');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var recipeRouter = require('./routes/recipe');
var app = express();

//const MongoStore = connectStore(session);
//const port = process.env.PORT || config.get("app-port");
const prefix = config.get("api.prefix");
const db = config.get("database.url");
mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true } )
    .then(() => vm.log("connected to MongoDB", db))
    .catch(err => vm.log("error mongodb", err));

/*app.use(session({
  name: process.env.SESS_NAME,
  secret: process.env.SESS_SECRET,
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'session',
    ttl: parseInt(process.envSESS_LIFETIME) / 1000
  }),
  cookie: {
    path: '/',
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: parseInt(process.env.SESS_LIFETIME)
  }
}));*/
//var date = new Date();
app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,x-api-key");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(logger('dev'));
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); //switch to express
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(prefix, usersRouter);
app.use(prefix, loginRouter);
app.use(prefix, registerRouter);
app.use(prefix, recipeRouter);



//app.listen(port, vm.log("listing on port", port));

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

