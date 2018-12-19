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
				let response = await Vue.http.post(setup.API + '/products/create', product);

				if (response.data.err === 0) {
					product.id = response.data.id;

					let newResponse = await Vue.http.post(setup.API + '/categories/add', {
						product: product
					});

					if (newResponse.data.err === 0) {
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

		async get(store, id) {
			try {
				let response = await Vue.http.post(setup.API + '/products/get', {
					id: id
				});

				if (response.data.err === 0) {
					return response.data.product;
				} else {
					Vue.toast.customToast({
						title: 'Get the product: Fail',
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

		async page(store, index) {
			try {
				let response = await Vue.http.post(setup.API + '/products/page', {
					startIndex: index
				});

				if (response.data.err === 0) {
					store.commit('products', response.data.products);
					
					return response.data.products;
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
		},

		test() {
			console.log('mamaaaaaaaaaaa');
			return;
		}
	},

	mutations: {
		products(state, value) {
			state.products = value;
		}
	}
};