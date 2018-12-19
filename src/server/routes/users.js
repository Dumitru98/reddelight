'use strict';

var express = require('express');
var debug = require('debug')('reddelight:user-routes');
var uuid = require('uuid');
var moment = require('moment');
var db = require('../database/database.js');
var nodemailer = require('nodemailer');

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
		var fullName = req.body.fullName;
		var email = req.body.email;

		let user = await db.user.findByUsername(username);

		if (!user) {
			var token = createToken();

			await db.user.createUser(username, password, fullName, email, token);
			debug('User ' + req.body.username + ' created');
			return res.status(200).send({ err: 0, token: token });
		} else {
			debug('The user ' + req.body.username + ' already exist');
			return res.status.send({ err: 1, message: 'The user ' + req.body.username + ' already exist!' });
		}
	} catch(e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e });
	}
});

publicApp.post('/login', async function(req, res) {
	try {
		let user = await db.user.findByUsernameAndPassword(req.body.username, req.body.password);

		if (user) {
			var token = createToken();

			await db.user.setToken(req.body.username, token);
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

privateApp.post('/get', async function (req, res) {
	try {
		let user = await db.user.findByToken(req.body.token);

		if (user) {
			debug('Got user successful');
			return res.status(200).send({ err: 0, user: user });
		} else {
			debug('Couldn\'t get the user info');
			return res.status(200).send({ err: 1, message: 'Couldn\'t get the user information!' });
		}
	} catch (e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e });
	}
});

privateApp.post('/update', async function (req, res) {
	try {
		let user = await db.user.findByToken(req.body.token);

		if (user) {
			await db.user.updateInfo(req.body.userInfo.username, req.body.userInfo.name, req.body.userInfo.email, req.body.userInfo.address, req.body.userInfo.phone);
			debug('Updated user successful');
			return res.status(200).send({ err: 0 });
		} else {
			debug('Couldn\'t update the user');
			return res. status(200).send({ err: 1, message: 'Couldn\t update the user!' });
		}
	} catch (e) {
		debug('Server error');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e });
	}
});

publicApp.post('/makeCommand', function(req, res) {
	try {
		var command = req.body.command;
		
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'andyalpha98@gmail.com',
				pass: 'Alexandru.98'
			}
		});

		var productsText = '';
		var productsPrice = 0; //De adaugat cost livrare
		for (let product of command.products) {
			productsText += '\n\nNume: ' + product.name;
			productsText += '\nId: ' + product.id;
			productsText += '\nPret: ' + product.price + ' Lei';
			productsText += '\nCantitate: ' + product.quantity;
			productsText += '\nCuloare: ' + product.color;
			productsText += '\nMarime: ' + product.size;
			productsPrice += product.price * product.quantity;
		}

		var mailOptions = {
			from: 'andyalpha98@gmail.com',
			to: 'dumitru.alexandru.1998@gmail.com',
			subject: 'Reddelight test',
			text:
				'\tDate comandă nouă:' +
				'\n\nCodul comenzii: ' + uuid.v1() +
				'\nData comenzii: ' + moment().format('MMMM Do YYYY, h:mm:ss a') +

				'\n\n\n\tDatele client:' +
				'\n\nNume: ' + command.firstName + ' ' + command.lastName +
				'\nEmail: ' + command.email +
				'\nNumăr de contact: ' + command.phone +
				'\nAdresă de livrare: ' + command.state + ' ' + command.city + ' ' + command.address +
				// '\nModalitate de livrare: ' + 	De intrebat
				// '\nMetodă de plată: ' +
				
				'\n\n\n\tRezumat comandă:' +
				productsText +
				// '\n\nCost livrare: ' +
				'\n\n\nPreț final: ' + productsPrice //To add delivery cost
		};

		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				debug('Command not sent\n' + error);
				return res.status(200).send({ err: 1, message: 'Couldn\'t process your command!' + error });
			} else {
				debug('Command sent successful\n' + info.response);
				return res.status(200).send({ err: 0 });
			}
		});
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

privateApp.post('/delete', async function(req, res) {
	try {
		var user = db.user.findByUsername(req.body.username);

		if (user) {
			await db.user.deleteByUsername(req.body.username);

			debug('User deleted successful');
			return res.status(200).send({ err: 0 });
		} else {
			debug('User doesn\'t exist');
			return res.status(200).send({ err: 1, message: 'User ' + req.body.username + ' doesn\'t exist!'});
		}
	} catch(e) {
		debug('Server serror');
		return res.status(400).send({ err: 1, message: 'Server error!\n' + e });
	}
});

module.exports.publicRoutes = publicApp;
module.exports.security = security;
module.exports.privateRoutes = privateApp;