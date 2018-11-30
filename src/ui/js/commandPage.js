require('bootstrap');
var Vue = require('vue');

var store = require('./store/login/store.js');
var toast = require ('./vue-toast.js');

Vue.use(toast);

Vue.mixin({
	store
});

var CommandPage = require('./components/commandPage/CommandPage.vue');

new Vue({
	el: '#commandPage',
	data: {},
	render: function(render) {
		return render(CommandPage);
	},

});