'use strict';

var express = require('express');
var debug = require('debug')('reddelight:category-routes');
var db = require('../database/database.js');

var publicApp = express.Router();

debug.log = console.info.bind(console);

publicApp.post('/create', async function(req, res) {
	try {
		var name = req.body.name;

		var category = await db.category.findByCategoryName(name);

		if (!category) {
			await db.category.createCategory(name);

			debug('Category created');
			return res.status(200).send({ err: 0 });
		} else {
			debug('Category already exists');
			return res.status(200).send({ err: 1, message: 'The category ' + name + ' already exist!' });
		}
	} catch (e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e});
	}
});

publicApp.post('/add', async function(req, res) {
	try {
		for (let id of req.body.ids) {
			var product = await db.product.findByProductId(id);
			await db.category.addProduct(req.body.name, product);
		}

		debug('Product added');
		return res.status(200).send({ err: 0 });
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error\n' + e });
	}
});

publicApp.post('/names', async function(req, res) {
	try {
		var categories = await db.category.listCategories();

		if (categories) {
			var names = [];

			for (let category of categories) {
				names.push(category.name);
			}

			debug('Product added');
			return res.status(200).send({ err: 0, names: names });
		} else {
			debug('Couldn\'t list all categories');
			return res.status(200).send({ err: 1, message: 'Couldn\'t list all categories!' });
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error\n' + e });
	}
});

publicApp.post('/get', async function(req, res) {
	try {
		var category = await db.category.findByCategoryName(req.body.name);
			
		if (category) {
			var productsToSend = [];
			var i = 1;
			var stopIndex = req.body.startIndex * 30 + 1;
			var startIndex = stopIndex - 30;

			for (let product of category.products) {
				if (i >= startIndex && i <= stopIndex) {
					productsToSend.push(product);
				}

				i ++;
			}

			debug('Products from category ' + req.body.name + ' got successful');
			return res.status(200).send({ err: 0, products: category.products });
		} else {
			debug('Category doesn\'t exist');
			return res.status(200).send({ err: 1, message: 'The category ' + req.body.name + ' doesn\'t exist!' });
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error\n' + e });
	}
});

publicApp.post('/count', async function(req, res) {
	try {
		var category = await db.category.findByCategoryName(req.body.name);

		if (category) {
			debug('The products were counted successful');
			return res.status(200).send({ err: 0, count: category.products.length });
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
		var category = db.category.findByCategoryName(req.body.name);

		if (category) {
			for (let id of category.products) {
				await db.product.deleteCategory(id, name);
			}

			await db.category.deleteCategory(req.body.name);

			debug('The category was successful deleted');
			return res.status(200).send({ err: 0 });
		} else {
			debug('The category ' + category + ' doesn\t exist');
			return res.status(200).send({ err: 1, message: 'The category ' + category + ' doesn\'t exist!' });
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e });
	}
});

module.exports.publicRoutes = publicApp;