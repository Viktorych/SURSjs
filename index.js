
var express = require('express');
var app = express();

var favicon = require('serve-favicon')
var path = require('path')
 
var app = express()
app.use(favicon(path.join(__dirname, 'public', 'Images','Red_trademark.ico')))


app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');
//app.use(favicon(path.join(__dirname,'public','Images','Red_trademark.ico')));

var favicon = require('serve-favicon');

//app.use(favicon(__dirname + './public/Images/Red_trademark.ico'));
app.get('/', function (req, res) {
    res.render('index', { title: 'Главная страница', message: 'Hello there!'});
});
app.get('/dt', function (req, res) {
  res.render('dt', { title: 'Тест ДТ', message: 'test'});
});

app.listen(3000, function () {
  console.log(__dirname);
  console.log('Example app listening on port 3000!');
});
