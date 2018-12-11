var Vue = require('vue');
var setup = require('../../setup.js');

module.exports = {
	namespaced: true,

	actions: {
		async create(store, name) {
			try {
				let response = await Vue.http.post(setup.API + '/categories/create', {
					name: name
				});

				if (response.data.err === 0) {
					return true;
				} else {
					Vue.toast.customToast({
						title: 'Create category: Fail',
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

		async get(store, name) {
			try {
				let response = await Vue.http.get(setup.API + '/categories/get', {
					name: name
				});

				if (response.data.err === 0) {
					return response.data.products;
				} else {
					Vue.toast.customToast({
						title: 'Load products for category: Fail',
						message: response.data.message,
						type: 'warning'
					});

					return null;
				}
			} catch(error) {
				Vue.toast.serverErrorToast(error);
				return null;
			}
		},

		async add(store, name, ids) {
			try {
				let response = await Vue.http.post(setup.API + '/categories/add', {
					name: name,
					ids: ids
				});

				if (response.data.err === 0) {
					return true;
				} else {
					Vue.toast.customToast({
						title: 'Add Products to a Category: Fail',
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
	}
};