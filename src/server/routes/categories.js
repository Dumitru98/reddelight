'use strict';

var express = require('express');
var debug = require('debug')('reddelight:category-routes');
var db = require('../database/database.js');

var publicApp = express.Router();

debug.log = console.info.bind(console);

publicApp.post('/create', async function(req, res) {
	try {
		var category = db.category.findByCategoryName(req.body.name);

		if (!category) {
			var newCategory = {
				name: req.body.name,
				products: []
			};

			await db.category.createCategory(newCategory);

			debug('Category created');
			return res.status(200).send({ err: 0 });
		} else {
			debug('Category already exists');
			return res.status(200).send({ err: 1, message: 'The category ' + req.body.name + ' already exist!' });
		}
	} catch (e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e});
	}
});

publicApp.post('/add', async function(req, res) {
	try {
		var category = await db.category.findByCategoryName(req.body.name);

		if (category) {
			for (let id of req.body.ids) {
				await db.product.addCategory(id, name);
				
				let product = await db.product.getById(id);

				var newProduct = {
					id: product.id,
					name: product.name,
					price: product.price,
					stock: product.stock
				};

				await db.category.addProduct(req.body.name, newProduct);
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
	try {
		var category = await db.category.findByCategoryName(req.name);

		if (category) {
			debug('Products got successful');
			return res.status(200).send({ err: 0, products: category.products });
		} else {
			debug('Category doesn\'t exist');
			return res.status(200).send({ err: 1, message: 'The category ' + req.name + ' doesn\'t exist!' });
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