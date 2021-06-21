var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//express-ejs-layouts 
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');
var articleAPIRouter = require('./routes/articleAPI');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//노드 앱에서 사용할 layout 관련설정을 추가한다.
//기본 레이아웃 페이지를 views 폴더내 layout.ejs 파일로 지정한다.
app.set('layout', 'layout');

//콘텐츠 페이지내 스크립트를 레이아웃페이지에서 사용하도록, 외부 스크립트 파일도 사용할 수 있게 설정
app.set('layout extractScripts', true);

//노드앱에서 expressLayouts 사용하게 최종 설정
app.use(expressLayouts);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);
app.use('/articleAPI', articleAPIRouter);

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
