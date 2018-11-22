var mongoose = require('mongoose');
var crypto = require('crypto');
var _ = require('lodash');

var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		unique: true
	},
	token: {
		type: String,
		required: true
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

function createUser(username, password, token) {
	var user = new User(_.assign({}, {
		username: username,
		password: encryptPassword(password),
		token: token,
	}));

	return user.save();
}

function findByUsername(username) {
	return User.findOne({ username: username });
}

function findByUsernameAndPassword(username, password) {
	return User.findOne({ username: username, password: encryptPassword(password)});
}

function findByToken(token) {
	return User.findOne({ token: token });
}

function deleteByUsername(username) {
	return User.remove({ username });
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
	setToken,
};

module.exports = user;