const express = require('express');
const app = express();

/**
 * 	Import our Routes
 **/
// Client Route Code
const index = require('../routes/client/index');
const confirmation = require('../routes/client/confirmation');
const cartCheckout = require('../routes/client/cartCheckout');

// Server Route Code
const orderLines = require('../routes/server/order-lines');
const push = require('../routes/server/push');

// Server & Client (Error) Route Code
const notFound = require('../routes/both/404.js');
const serviceUnavailable = require('../routes/both/500.js');

/**
 * 	Set URLS for our Routes
 **/
// Set Client Route URLS
app.use('/', index);
app.use('/confirmation', confirmation);
app.use('/cart-checkout', cartCheckout);

// Set Server Route URLS
app.use('/push', push);
app.use('/order-lines', orderLines);

// Set Server & Client (Error) Route URLS
app.use('/500', serviceUnavailable);
app.use('*', notFound); // Always keep as last route

module.exports = app;
