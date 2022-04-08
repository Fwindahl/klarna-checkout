/**
 *      This file just imports and initiates Express and Express Handlebars.
 */
const express = require('express');
const app = express();

// Register `hbs.engine` with the Express app.
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
	defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

module.exports = app;
