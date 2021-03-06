'use strict';

var express = require('express');
var debug = require('debug')('reddelight:product-routes');
var uuid = require('uuid');
var db = require('../database/database.js');

var publicApp = express.Router();

debug.log = console.info.bind(console);

function createProductId() {
	return uuid.v4() + uuid.v4();
}

publicApp.post('/create', async function(req, res) {
	try {
		var id = createProductId();
		var date = new Date();
		var name = req.body.name;
		var price = req.body.price;
		var stock = req.body.stock;
		var sizes = req.body.sizes;
		var colors = req.body.colors;
		var categories = req.body.categories;

		await db.product.createProduct(id, name, price, stock, sizes, colors, categories, date);

		debug('Product created');
		return res.status(200).send({ err: 0, id: id });
	} catch (e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e});
	}
});

publicApp.post('/get', async function(req, res) {
	try {
		var product = await db.product.findByProductId(req.body.id);

		if (product) {
			debug('Product got successful');
			return res.status(200).send({ err: 0, product: product });
		} else {
			debug('Couldn\'t get the product');
			return res.status(200).send({ err: 1, message: 'Couldn\'t get the product!' });
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e });
	}
});

publicApp.post('/page', async function(req, res) {
	try {
		var products = await db.product.listProducts();

		if (products) {
			var productsToSend = [];
			var i = 1;
			var stopIndex = req.body.startIndex * 30;
			var startIndex = stopIndex - 30 + 1;
			for (let product of products) {
				if (i >= startIndex && i <= stopIndex) {
					productsToSend.push(product);
				}

				i++;
			}

			debug('Products got successful');
			return res.status(200).send({ err: 0, products: productsToSend });
		} else {
			debug('Could\'t get the products');
			return res.status(200).send({ err: 1, message: 'Could\'t get the products!' });
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e });
	}
});

publicApp.post('/count', async function(req, res) {
	try {
		var products = await db.product.listProducts();

		if (products) {
			debug('The products were counted successful');
			return res.status(200).send({ err: 0, count: products.length });
		} else {
			debug('Failed to get the product list');
			return res.status(200).send({ err: 1, message: 'Couldn\'t get the product list!' });
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e });
	}
});

publicApp.post('/delete', async function(req, res) {
	try {
		var product = await db.product.findByProductId(req.body.id);

		if (product) {
			await db.product.deleteProduct(req.body.id);

			var categories = product.categories;

			for (let category of categories) {
				await db.category.deleteProduct(category, req.body.id);
			}
			debug('Product deleted successful');
			return res.status(200).send({ err: 0 });
		} else {
			debug('Product doesn\'t exist');
			return res.status(200).send({ err: 1, message: 'Product doesn\'t exist!' });
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e });
	}
});

module.exports.publicRoutes = publicApp;