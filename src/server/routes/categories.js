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
		console.log(category);

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
		var product = await db.product.findByProductId(req.body.id);

		if (product) {
			for (let category of req.body.categories) {
				var categories = product.categories;
				categories.push(category);

				var newProduct = {
					id: product.id,
					name: product.name,
					price: product.price,
					stock: product.stock,
					categories: categories
				};

				await db.category.addProduct(category, newProduct);
			}

			debug('Product added');
			return res.status(200).send({ err: 0 });
		} else {
			debug('Category doesn\'t exist');
			return res.status(200).send({ err: 1, message: 'The category ' + req.body.name + ' doesn\'t exist!' });
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error\n' + e });
	}
});

publicApp.get('/get', async function(req, res) {
	console.log(req);
	try {
		if (req.name === '') {
			var categories = await db.category.getAllCategories();

			if (categories) {
				debug('All categories got successful');
				return res.status(200).send({ err: 0, categories: categories });
			} else {
				debug('Could\'t get all the categories');
				return res.status(200).send({ err: 1, message: 'Could\'t get all the categories!' });
			}
		} else {
			var category = await db.category.findByCategoryName(req.name);
			if (category) {
				debug('Products got successful');
				return res.status(200).send({ err: 0, products: category.products });
			} else {
				debug('Category doesn\'t exist');
				return res.status(200).send({ err: 1, message: 'The category ' + req.name + ' doesn\'t exist!' });
			}
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error\n' + e });
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