var Vue = require ('vue');

var VueResource = require ('vue-resource');
Vue.use (VueResource);

var Vuex = require ('vuex');
Vue.use (Vuex);

var Validator = require('validator');
Vue.use (Validator);

var settings = require ('../modules/settings');
var category = require ('../modules/category');
var product = require ('../modules/product');

module.exports = new Vuex.Store ({
	modules: {
		settings,
		category,
		product
	},
	strict: process.env.NODE_ENV !== 'production'
});