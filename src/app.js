const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');

const app = express();

//°°°°°°°°°°  SETTINGS   °°°°°°°°°°//
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//°°°°°°°°°° MIDDLEWARES °°°°°°°°°°//
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));


//°°°°°°°°°°   ROUTES    °°°°°°°°°°//
app.use(require('./modules/1_1_index/1_index'));


//°°°°°°°°°° STATIC FILES °°°°°°°°°°//
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;