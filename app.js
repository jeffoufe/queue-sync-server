var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playlistsRouter = require('./routes/playlists');
var tracksRouter = require('./routes/tracks');
var scPlaylistsRouter = require('./routes/scPlaylists');

var app = express();
app.use(express.static(path.join(__dirname, 'public'))); 

const uri = "mongodb+srv://jeffoufe:Laporeille51@cluster0-wkpnb.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(async (err) => {
  app.locals.users = client.db('QueueSync').collection('users');
  app.locals.playlists = client.db('QueueSync').collection('playlists');
  app.locals.tracks = client.db('QueueSync').collection('tracks');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/:userId/playlists', playlistsRouter)
app.use('/users/:userId/tracks', tracksRouter)
app.use('/users/:userId/sc-playlists', scPlaylistsRouter);

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
