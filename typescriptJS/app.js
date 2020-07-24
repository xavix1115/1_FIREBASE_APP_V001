"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var app = express();
exports.app = app;
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.get('/bienvenidos', function (req, res) {
    res.render('index');
});
app.use(require('./modules/1_1_index/1_index'));
app.use(require('./modules/4_1_login/1_login'));
app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;
console.log('app.js funcionando');
