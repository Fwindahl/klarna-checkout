import fetch from 'node-fetch';

function getKlarnaAuth() {
	const username = process.env.PUBLIC_KEY;
	const password = process.env.SECRET_KEY;
	const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
	return auth;
}

function formatAsOrderLines(currentCart) {
	currentCart.forEach((item) => {
		item.total_amount = item.quantity * item.unit_price;
		item.total_tax_amount = item.total_amount - (item.total_amount * 10000) / (10000 + item.tax_rate);
	});
	return currentCart;
}

function formatProduct({ product, quantity }) {
	return {
		type: 'physical', // same
		reference: product.id,
		name: product.title,
		quantity: quantity, // As a challenge, this value should be dynamic so that we can buy multiple items
		quantity_unit: 'pcs', // same
		unit_price: parseInt(product.price) * 100,
		tax_rate: 2500, // same
		total_discount_amount: 0, // same
		image_url: product.image
	};
}

// 1. Add async createOrder function that returns Klarna response.json()
async function createOrder(products) {
	const formattedProducts = products.map(formatProduct);
	const order_lines = formatAsOrderLines(formattedProducts);

	let order_amount = 0;
	let order_tax_amount = 0;

	order_lines.forEach((item) => {
		order_amount += item.total_amount;
		order_tax_amount += item.total_tax_amount;
	});

	// Sub Parts
	const path = '/checkout/v3/orders';
	const auth = getKlarnaAuth();

	// Main Parts
	const url = process.env.BASE_URL + path;
	const method = 'POST'; // GET, POST, PUT, DELETE
	const headers = {
		'Content-Type': 'application/json',
		Authorization: auth
	};

	// The payload we send to Klarna
	const payload = {
		purchase_country: 'SE',
		purchase_currency: 'SEK',
		locale: 'sv-SE',
		order_amount: order_amount,
		order_tax_amount: order_tax_amount,
		order_lines,
		merchant_urls: {
			terms: 'https://www.example.com/terms.html',
			checkout: 'https://www.example.com/checkout.html',
			confirmation: `${process.env.CONFIRMATION_URL}/confirmation?order_id={checkout.order.id}`,
			push: 'https://www.example.com/api/push'
		},
		shipping_options: [
			{
				id: 'express_priority',
				name: 'Techover EXPRESS 1-2 full moons',
				price: 39 * 100,
				tax_amount: 0,
				tax_rate: 0
			}
		]
	};

	const body = JSON.stringify(payload);
	const response = await fetch(url, { method, headers, body });
	const jsonResponse = await response.json();

	// "200" is success from Klarna KCO docs
	if (response.status === 200 || response.status === 201) {
		return jsonResponse;
	} else {
		console.error('ERROR: ', jsonResponse);
		return { html_snippet: `<h1>${JSON.stringify(jsonResponse)}</h1>` };
	}
}
// 2. Add async retrieveOrder function that returns Klarna response.json()
async function retrieveOrder(order_id) {
	// Sub Parts
	const path = '/checkout/v3/orders/' + order_id;
	const auth = getKlarnaAuth();

	// Main Parts
	const url = process.env.BASE_URL + path;
	const method = 'GET'; // GET, POST, PUT, DELETE
	const headers = { Authorization: auth };
	const response = await fetch(url, { method, headers });

	// "200" is success from Klarna KCO docs
	if (response.status === 200 || response.status === 201) {
		const jsonResponse = await response.json();
		return jsonResponse;
	} else {
		console.error('ERROR: ', response.status, response.statusText);
		return {
			html_snippet: `<h1>${response.status} ${response.statusText}</h1>`
		};
	}
}

// 3. export createOrder and retrieveOrder below, and use them in api/client/index.js and api/client/confirmation.js
module.exports = { getKlarnaAuth, createOrder, retrieveOrder };
