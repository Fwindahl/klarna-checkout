const express = require('express');
const app = express.Router();

// THIS ROUTE IS FOR THOSE WHO WANT TO GO ABOVE AND BEYOND
app.get('/push', function (req, res, next) {
	res.send('Use this route to acknowledge orders that Klarna asks your server about');
});

module.exports = app;
