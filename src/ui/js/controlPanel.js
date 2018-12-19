require('bootstrap');
var Vue = require('vue');

var store = require('./store/controlpanel/store.js');
var toast = require ('./vue-toast.js');
var bootstrapvue = require('bootstrap-vue');
Vue.use(toast);
Vue.use(bootstrapvue);
Vue.mixin({
	store
});

var ControlPanel = require('./components/controlPanel/ControlPanel.vue');

new Vue({
	el: '#controlPanel',
	data: {},
	render: function(render) {
		return render(ControlPanel);
	},

});