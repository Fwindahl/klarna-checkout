const app = require('../../loaders/express-handlebars');

app.get('/', async function (req, res, next) {
	res.render('welcome', {});
});

module.exports = app;
