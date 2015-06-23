import User from '../models/User.js';
import {http} from '../util/adapter.js';

const AUTH_STORAGE_KEY = 'AUTH_STORAGE_KEY';

export default angular.module('AuthService', []).factory('AuthService', () => {
	let userId;

	const ERROR_UNAUTHORIZED = 'ERROR_UNAUTHORIZED';

	return {
		ERROR_UNAUTHORIZED,

		requestUser() {
			return this.requestUserId().then(userId => {
				if (!userId) {
					throw ERROR_UNAUTHORIZED;
				} else {
					return User.find(userId).catch(error => {
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
				http.get('auth').then(response => {
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
			return http.post('auth', {
				phone: login,
				password
			}).then(response => userId = response.user_id);
		},

		logout() {
			userId = null;
			return http.del('auth');
		}
	}
});