var Vue = require('vue');
var setup = require('../../setup.js');

module.exports = {
	namespaced: true,

	state: {
		products: null
	},

	getters: {
		products(state) {
			return state.products;
		}
	},

	actions: {
		async create(store, name) {
			try {
				let response = await Vue.http.post(setup.API + '/categories/create', {
					name: name
				});

				if (response.data.err === 0) {
					Vue.toast.customToast({
						title: 'Create Category: Success',
						message: 'The category ' + name + ' was created!',
						type: 'info'
					});

					return true;
				} else {
					Vue.toast.customToast({
						title: 'Create Category: Fail',
						message: response.data.message,
						type: 'warning'
					});

					return false;
				}
			} catch(error) {
				Vue.toast.serverErrorToast(error);
				return false;
			}
		},

		async add(store, name, ids) {
			try {
				let response = await Vue.http.post(setup.API + '/categories/add', {
					name: name,
					ids: ids
				});

				if (response.data.err === 0) {
					Vue.toast.customToast({
						title: 'Add Products to Category: Success',
						message: 'The products were added to category ' + name + ' !',
						type: 'info'
					});

					return true;
				} else {
					Vue.toast.customToast({
						title: 'Add Products to Category: Fail',
						message: response.data.message,
						type: 'warning'
					});

					return false;
				}
			} catch(error) {
				Vue.toast.serverErrorToast(error);
				return false;
			}
		},

		async names() {
			try {
				let response = await Vue.http.post(setup.API + '/categories/names');

				if (response.data.err === 0) {
					return response.data.names;
				} else {
					Vue.toast.customToast({
						title: 'Get Categories Names: Fail',
						message: response.data.message,
						type: 'warning'
					});

					return false;
				}
			} catch(error) {
				Vue.toast.serverErrorToast(error);
				return false;
			}
		},

		async get(store, names, index) {
			try {
				let response = await Vue.http.post(setup.API + '/categories/get', {
					names: names,
					startIndex: index
				});

				if (response.data.err === 0) {
					console.log(response.data);
					return response.data.products;
				} else {
					Vue.toast.customToast({
						title: 'Get Products From Category: Fail',
						message: response.data.message,
						type: 'warning'
					});

					return false;
				}
			} catch(error) {
				Vue.toast.serverErrorToast(error);
				return false;
			}
		},

		async count(store, name) {
			try {
				let response = await Vue.http.post(setup.API + '/categories/count', {
					name: name
				});

				if (response.data.err === 0) {
					return response.data.count;
				} else {
					Vue.toast.customToast({
						title: 'Count Products From Category: Fail',
						message: response.data.message,
						type: 'warning'
					});

					return false;
				}
			} catch(error) {
				Vue.toast.serverErrorToast(error);
				return false;
			}
		},

		async delete(store, name) {
			try {
				let response = await Vue.http.post(setup.API + '/categories/delete', {
					name: name
				});

				if (response.data.err === 0) {
					Vue.toast.customToast({
						title: 'Delete Category: Success',
						message: 'The category ' + name + ' was deleted!',
						type: 'info'
					});

					return true;
				} else {
					Vue.toast.customToast({
						title: 'Delete Category: Fail',
						message: response.data.message,
						type: 'warning'
					});

					return false;
				}
			} catch(error) {
				Vue.toast.serverErrorToast(error);
				return false;
			}
		}
	},

	mutations: {
		products(state, value) {
			state.products = value;
		}
	}
};