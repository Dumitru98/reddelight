require('bootstrap');
var Vue = require('vue');
var store = require('./store/login/store.js');
var toast = require ('./vue-toast.js');

Vue.use(toast);
Vue.mixin({
	store
});

var Dashboard = require('./components/dashboard/Dashboard.vue');

new Vue({
	el: '#wrapper',
	data: {},
	render: function(render) {
		return render(Dashboard);
	},

});