require('bootstrap');
var Vue = require('vue');

var store = require('./store/login/store.js');
var toast = require ('./vue-toast.js');

Vue.use(toast);

Vue.mixin({
	store
});

var Contact = require('./components/contact/Contact.vue');

new Vue({
	el: '#contact',
	data: {},
	render: function(render) {
		return render(Contact);
	},

});