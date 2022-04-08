const express = require('express');
const app = express.Router();

app.get('*', (req, res, next) => {
	res.status(404).send('404 Page not found');
});

module.exports = app;
