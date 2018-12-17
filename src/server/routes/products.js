'use strict';

var express = require('express');
var debug = require('debug')('reddelight:product-routes');
var uuid = require('uuid');
var db = require('../database/database.js');

var publicApp = express.Router();

debug.log = console.info.bind(console);

function createProductId() {
	return uuid.v4() + uuid.v4() + uuid.v4() + uuid.v4();
}

publicApp.post('/create', async function(req, res) {
	try {
		var id = createProductId();
		var date = new Date();
		var name = req.body.name;
		var price = req.body.price;
		var stock = req.body.stock;
		var categories = req.body.categories;

		await db.product.createProduct(id, name, price, stock, categories, date);

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

publicApp.post('30', async function(req, res) {
	try {
		var products = await db.product.listProducts();
		if (products) {
			console.log(req.body);
			var productsToSend = [];
			var i = 1;
			for (let product of products) {
				if (i >= req.body.startIndex && i <= req.body.startIndex + 30) {
					productsToSend.add(product);
				}
				i++;
			}
			console.log(productsToSend);
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

publicApp.post('/delete', async function(req, res) {
	try {
		var product = await db.product.findById(req.body.id);

		if (product) {
			await db.product.deleteProduct(req.body.id);

			var categories = await db.category.listCategories();

			for (let category of categories) {
				await db.category.deleteProduct(category.name, req.body.id);
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