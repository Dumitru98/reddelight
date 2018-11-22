'use strict';

var express = require('express');
var debug = require('debug')('reddelight:user-routes');
var uuid = require('uuid');
var db = require('../database/database.js');

var publicApp = express.Router();
var privateApp = express.Router();

debug.log = console.info.bind(console);

function createToken() {
	return uuid.v4() + uuid.v4() + uuid.v4() + uuid.v4();
}

function security(req, res, next) {
	let token = null;

	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
		token = req.headers.authorization.split(' ')[1];

	if (!token && req.headers.Authorization && req.headers.Authorization.split(' ')[0] === 'Bearer')
		token = req.headers.Authorization.split(' ')[1];

	if (!token) 
		token = req.query.token;

	if (!token) 
		token = req.body.token;

	req.token = token;
	next();
}

publicApp.post('/signup', async function(req, res) {
	try {
		var username = req.body.username;
		var password = req.body.password;

		let user = await db.user.findByUsername(username);

		if (!user) {
			var token = createToken();

			await db.user.createUser(username, password, token);
			debug('User ' + username + ' created');
			return res.status(200).send({ err: 0, token: token });
		} else {
			debug('The user ' + username + ' already exist');
			return res.status.send({ err: 1, message: 'The user ' + username + ' already exist!' });
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e });
	}
});

publicApp.post('/login', async function(req, res) {
	try {
		var username = req.body.username;
		var password = req.body.password;

		let user = await db.user.findByUsernameAndPassword(username, password);

		if (user) {
			var token = createToken();

			await db.user.setToken(username, token);
			debug('Login successful');
			return res.status(200).send({ err: 0, token: token });
		} else {
			debug('Username or password incorrect');
			return res.status(200).send({ err: 1, message: 'This combination of username and password doesn\'t exist!' });
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e });
	}
});

privateApp.post('/logout', async function(req, res) {
	try {
		var user = await db.user.findByToken(req.body.token);

		if (user) {
			await db.user.setToken(user.username, '');
			debug('User found');
			return res.status(200).send({ err: 0 });
		} else {
			debug('Couldn\'t find the given token');
			return res.status(200).send({ err: 1, message: 'Couldn\'t find the user with the given token!' });
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e });
	}
});

module.exports.publicRoutes = publicApp;
module.exports.security = security;
module.exports.privateRoutes = privateApp;