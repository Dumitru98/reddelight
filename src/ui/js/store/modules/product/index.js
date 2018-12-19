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
						Vue.toast.customToast({
							title: 'Create a Product: Success',
							message: 'The product was created and added to the categories!',
							type: 'info'
						});

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
						title: 'Create Product: Fail',
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
						title: 'Get Product: Fail',
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
					return response.data.products;
				} else {
					Vue.toast.customToast({
						title: 'Get Products: Fail',
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

		async count() {
			try {
				let response = await Vue.http.post(setup.API + '/products/count');

				if (response.data.err === 0) {
					return response.data.count;
				} else {
					Vue.toast.customToast({
						title: 'Count Products: Fail',
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
					Vue.toast.customToast({
						title: 'Delete Product: Success',
						message: 'The product was deleted!',
						type: 'info'
					});

					return true;
				} else {
					Vue.toast.customToast({
						title: 'Delete Product: Fail',
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