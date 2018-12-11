var Vue = require('vue');
var setup = require('../../setup.js');

var KEY_TOKEN = 'reddelight.token';
Vue.http.interceptors.push(function(request, next) {
	if (window.localStorage.getItem(KEY_TOKEN)) {
		request.headers.set('Authorization', 'Bearer ' + window.localStorage.getItem(KEY_TOKEN));
	}
	next();
});

module.exports = {
	namespaced: true,

	state: {
		token: window.localStorage.getItem(KEY_TOKEN),
		user: null,
	},

	getters: {
		token(state) {
			return state.token;
		},
		user(state) {
			return state.user;
		}
	},

	actions: {
		async signup(store, credentials) {
			try {
				let response = await Vue.http.post(setup.API + '/users/signup', {
					credentials: credentials
				});

				if (response.data.token) {
					store.commit('token', response.data.token);

					return true;
				} else {
					Vue.toast.customToast({
						title: 'Sign Up: Fail',
						message: response.data.message,
						type: 'warning'
					});

					return false;
				}
			} catch (error) {
				Vue.toast.serverErrorToast(error);
				return false;
			}
		},

		async login(store, credentials) {
			try {
				let response = await Vue.http.post(setup.API + '/users/login', {
					credentials: credentials
				});

				if (response.data.token) {
					store.commit('token', response.data.token);

					return true;
				} else {
					Vue.toast.customToast({
						title: 'Login: Fail',
						message: response.data.message,
						type: 'warning'
					});

					return false;
				}
			} catch (error) {
				Vue.toast.serverErrorToast(error);
				return false;
			}
		},

		async get(store) {
			try {
				let response = await Vue.http.get(setup.API + '/users/get', {
					token: store.state.token
				});

				if (response.data.err === 0) {
					store.commit ('user', response.data.user);
					
					return response.data.user;
				} else {
					Vue.toast.customToast({
						title: 'Get the User:Fail',
						message: response.data.message,
						type: 'warning'
					});

					return null;
				}
			} catch (error) {
				Vue.toast.serverErrorToast(error);
				return null;
			}
		},

		async update(store, userInfo) {
			try {
				let response = await Vue.http.post(setup.API + '/users/update', {
					userInfo: userInfo,
					token: store.state.token
				});

				if (response.data.err === 0) {
					store.commit ('user', response.data.user);

					if(this.notifications)
						Vue.toast.customToast({
							title: 'Update Personal Informations: Success',
							message: response.data.message,
							type: 'info'
						});

					return true;
				} else {
					if(this.notifications)
						Vue.toast.customToast({
							title: 'Update Personal Informations: Fail',
							message: response.data.message,
							type: 'warning'
						});

					return false;
				}
			} catch (error) {
				Vue.toast.serverErrorToast(error);
				return false;
			}
		},

		async logout(store, token) {
			try {
				let response = await Vue.http.post(setup.API + '/users/logout', {
					token: token
				});

				if (response.data.err === 0) {
					store.commit('token', null);
					store.commit('user', null);

					return true;
				} else {
					Vue.toast.customToast({
						title: 'Log Out: Fail',
						message: response.data.message,
						type: 'warning'
					});

					return false;
				}
			} catch (error) {
				Vue.toast.serverErrorToast(error);
				return false;
			}
		},

		token(store) {
			store.commit('token', null);

			return true;
		},

		async delete(store, token) {
			try {
				let response = await Vue.http.post(setup.API + '/users/delete', {
					token: token
				});

				if (response.data.err === 0) {
					store.commit('token', null);
					store.commit('user', null);

					return false;
				} else {
					Vue.toast.customToast({
						title: 'Delete User: Fail',
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
		token(state, value) {
			if (value !== null) {
				window.localStorage.setItem(KEY_TOKEN, value);
				state.token = value;
			} else {
				window.localStorage.removeItem(KEY_TOKEN);
				state.token = undefined;
			}
		},
		user(state, value) {
			state.user = value;
		}
	}
};