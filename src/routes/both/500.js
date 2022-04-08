const express = require('express');
const app = express.Router();

app.use((err, req, res) => {
	res.status(err.status || 500);
	res.json({
		errors: {
			message: err.message,
			error: {}
		}
	});
});

module.exports = app;
