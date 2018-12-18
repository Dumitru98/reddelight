require('bootstrap');
var Vue = require('vue');
var store = require('./store/productPage/store.js');
var toast = require ('./vue-toast.js');

Vue.use(toast);
Vue.mixin({
	store
});

var ProductPage = require('./components/productPage/ProductPage.vue');

new Vue({
	el: '#productPage',
	data: {},
	render: function(render) {
		return render(ProductPage);
	},

});