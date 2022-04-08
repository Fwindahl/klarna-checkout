const app = require('../../loaders/express-handlebars');

// THIS ROUTE IS FOR THOSE WHO WANT TO GO ABOVE AND BEYOND IN WEEK 10/11!
app.get('/order-lines', function (req, res, next) {
	res.send('Use this route to safely get cart information from a database');
});

module.exports = app;
