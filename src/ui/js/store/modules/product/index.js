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
		async create(store, product) {
			try {
				var categories = [];
				let response = await Vue.http.post(setup.API + '/products/create', {
					product: product,
					categories: categories
				});

				if (response.data.err === 0) {
					let response = await Vue.http.post(setup.API + '/categories/add', {
						product: product,
						categories: categories
					});

					if (response.data.err === 0) {
						return true;
					} else {
						Vue.toast.customToast({
							title: 'Create a Product: Fail',
							message: response.data.message,
							type: 'warning'
						});
	
						return false;
					}
				} else {
					Vue.toast.customToast({
						title: 'Create a Product: Fail',
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

		async get(store) {
			try {
				let response = await Vue.http.get(setup.API + '/products/get');

				if (response.data.err === 0) {
					let products = [];

					for (let category of response.data.categories) {
						for (let product of category) {
							products.add(product);
						}
					}

					store.commit('products', products);

					return true;
				} else {
					Vue.toast.customToast({
						title: 'Get the products: Fail',
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

		async delete(store, id) {
			try {
				let response = await Vue.http.post(setup.API + '/products/delete', {
					id: id
				});

				if (response.data.err === 0) {
					return true;
				} else {
					Vue.toast.customToast({
						title: 'Delete the Product: Fail',
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