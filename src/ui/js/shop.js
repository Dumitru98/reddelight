require('bootstrap');
var Vue = require('vue');

var store = require('./store/login/store.js');
var toast = require ('./vue-toast.js');

Vue.use(toast);

Vue.mixin({
	store
});

var Shop = require('./components/shop/Shop.vue');

new Vue({
	el: '#shop',
	data: {},
	render: function(render) {
		return render(Shop);
	},

});