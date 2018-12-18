module.exports = {
	namespaced: true,
	state: {
		LOGIN: '/login.html',
		SIGNUP: '/signup.html',
		DASHBOARD: '/dashboard.html',
		SHOP: '/shop.html',
		PRODUCTPAGE: '/productPage.html?id=',
		ids:[],
	},
	actions: {
		redirect(store, application) {
			let address = store.state[application.address]+application.id;
			if (address !== '' && address !== undefined && address !== null) {
				window.location.href = address;
			}
		}
	},
	mutations: {
		id (state,id) {
			state.ids.push(id);
			return true;
		}
	}
};