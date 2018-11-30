var mongoose = require('mongoose');
var crypto = require('crypto');
var _ = require('lodash');

var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String
	},
	email: {
		type: String,
		unique: true
	},
	address: {
		type: String
	},
	phone: {
		type: String
	},
	token: {
		type: String,
		required: true,
		unique: true
	}
}, {
	toObject: {
		transform: function(doc, ret) {
			delete ret.password;
			delete ret.__v;
		}
	},
	toJSON: {
		transform: function(doc, ret) {
			delete ret.password;
			delete ret.__v;
		}
	}
});


function encryptPassword(password, salt) {
	if (!salt) {
		salt = '';
	}
	return crypto.createHash('sha256').update(password + salt).digest('base64');
}

var User = mongoose.model('User', userSchema);

function createUser(newUser) {
	var user = new User(_.assign({}, newUser));

	return user.save();
}

function findByUsername(username) {
	return User.findOne({ username: username });
}

function findByUsernameAndPassword(username, password) {
	return User.findOne({ username: username, password: encryptPassword(password) });
}

function findByToken(token) {
	return User.findOne({ token: token });
}

function deleteByUsername(username) {
	return User.deleteOne({ username });
}

function listUsers() {
	return User.find();
}

function setPassword(username, password) {
	return User.updateOne({ username: username }, { $set: { password: encryptPassword(password) } });
}

function editPassword(username, oldPassword, newPassword) {
	return User.updateOne({ username: username, password: encryptPassword(oldPassword) }, { $set: { password: encryptPassword(newPassword) } });
}

function resetPassword(username, password) {
	return User.updateOne({ username: username }, { $set: { password: encryptPassword(password) } });
}

function updateInfo(username, name, email, address, phone) {
	return User.updateOne({username: username}, { $set: { name: name, email: email, address: address, phone: phone} });
}

function setToken(username, token) {
	return User.updateOne({ username: username }, { $set: { token: token } });
}

var user = {
	createUser,
	findByUsername,
	findByUsernameAndPassword,
	findByToken,
	deleteByUsername,
	editPassword,
	setPassword,
	resetPassword,
	listUsers,
	updateInfo,
	setToken,
};

module.exports = user;