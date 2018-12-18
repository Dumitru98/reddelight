var Vue = require ('vue');

var VueResource = require ('vue-resource');
Vue.use (VueResource);

var Vuex = require ('vuex');
Vue.use (Vuex);

var Validator = require('validator');
Vue.use (Validator);

var settings = require ('../modules/settings');
var product = require ('../modules/product');
var category = require ('../modules/category');

module.exports = new Vuex.Store ({
	modules: {
		settings,
		product,
		category
	},
	strict: process.env.NODE_ENV !== 'production'
});