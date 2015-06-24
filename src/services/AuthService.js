export default angular.module('AuthService', []).factory('AuthService', (UserModel, HttpAdapter) => {
	let userId;

	const AUTH_STORAGE_KEY = 'AUTH_STORAGE_KEY';
	const ERROR_UNAUTHORIZED = 'ERROR_UNAUTHORIZED';

	return {
		ERROR_UNAUTHORIZED,

		requestUser() {
			return this.requestUserId().then(userId => {
				if (!userId) {
					throw ERROR_UNAUTHORIZED;
				} else {
					return UserModel.find(userId).catch(error => {
						if (error.status === 403) {
							throw ERROR_UNAUTHORIZED;
						} else {
							throw error;
						}
					})
				}
			});
		},

		requestUserId() {
			return new Promise((resolve, reject) => {
				if (userId) return resolve(userId);
				HttpAdapter.get('auth').then(response => {
					userId = response.user_id;
					if (!userId) {
						reject(ERROR_UNAUTHORIZED);
					} else {
						resolve(userId);
					}
				});
			});
		},

		isAuthorized() {
			return new Promise((resolve, reject) => {
				this.requestUser().then(resolve.bind(this, true)).catch(resolve.bind(this, false));
			});
		},

		login(login, password) {
			return HttpAdapter.post('auth', {
				phone: login,
				password
			}).then(response => userId = response.user_id);
		},

		logout() {
			userId = null;
			return HttpAdapter.del('auth');
		}
	}
});