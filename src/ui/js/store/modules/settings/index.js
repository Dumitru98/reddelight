module.exports = {
	namespaced: true,
	state: {
		LOGIN: '/login.html',
		SIGNUP: '/signup.html',
		DASHBOARD: '/dashboard.html'
	},
	actions: {
		redirect(store, application) {
			let address = store.state[application];
			if (address !== '' && address !== undefined && address !== null) {
				window.location.href = address;
			}
		}
	},
	mutations: {}
};