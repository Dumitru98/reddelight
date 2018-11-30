'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var debug = require('debug')('reddelight:app');
require('./database/database.js');
var users = require('./routes/users');
var categories = require('./routes/categories');
var products = require('./routes/products');
var error = require('./error.js');
var statusCodes = require('http-status-codes');

debug.log = console.info.bind(console);
var app = express();

if (process.env.NODE_ENV !== 'production') app.use(logger('dev'));

var apiv1 = express.Router();

apiv1.use(bodyParser.urlencoded({ extended: false }));
apiv1.use(bodyParser.json());


apiv1.use('/users', users.publicRoutes);
apiv1.use('/categories', categories.publicRoutes);
apiv1.use('/products', products.publicRoutes);

apiv1.use(users.security);

apiv1.use('/users', users.privateRoutes);

apiv1.use(function(req, res) {
	error.sendError(res, error.notFound('Link not found'));
});


app.use('/docs', express.static(path.join(__dirname, '/../docs')));
app.use('/api/v1', apiv1);

app.use(express.static(path.join(__dirname, '../ui')));

app.get('/', function(req, res) {
	res.redirect('/dashboard.html');
});

/** */
app.use(function(err, req, res, next) {
	next;
	if (err.status === statusCodes.INTERNAL_SERVER_ERROR) {
		error.sendError(res, error.serverError('Something went wrong with your request. Try again later!'));
		debug(err);
	} else {
		error.sendError(res, err);
	}
});

module.exports = app;