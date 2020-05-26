var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const passport = require('passport');
const passportConfig = require('./module/passport/index');
const expressSession = require('express-session');
var indexRouter = require('./routes/index');
const connect = require('./models');
var app = express();
require('dotenv').config();

var corsOptions = {
  origin: "http://localhost:8081"
};

connect();

//it provide Middleware to enable CORS 
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passportConfig(passport);
// app.js에서 설정 관련 코드는 app.use route 위에다가 배치
app.use(expressSession({
  secret : process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결

app.use('/', indexRouter);

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
  // res.render('error');
});

module.exports = app;
