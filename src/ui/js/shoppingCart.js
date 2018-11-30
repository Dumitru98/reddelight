require('bootstrap');
var Vue = require('vue');

var store = require('./store/login/store.js');
var toast = require ('./vue-toast.js');

Vue.use(toast);

Vue.mixin({
	store
});

var ShoppingCart = require('./components/shoppingCart/ShoppingCart.vue');

new Vue({
	el: '#shoppingCart',
	data: {},
	render: function(render) {
		return render(ShoppingCart);
	},

});