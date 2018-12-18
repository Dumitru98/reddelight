require('bootstrap');
var Vue = require('vue');

var store = require('./store/shop/store.js');
var toast = require ('./vue-toast.js');
var bootstrapvue = require('bootstrap-vue');
Vue.use(toast);
Vue.use(bootstrapvue);

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