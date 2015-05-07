import User from '../models/User.js';
import {http} from '../util/adapter.js';

const AUTH_STORAGE_KEY = 'AUTH_STORAGE_KEY';

export const ERROR_UNAUTHORIZED = 'ERROR_UNAUTHORIZED';

let userId;

export default class AuthService {
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
	}

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
	}

	isAuthorized() {
		return new Promise((resolve, reject) => {
			this.requestUser().then(resolve.bind(this, true)).catch(resolve.bind(this, false));
		});
	}

	login(login, password) {
		return http.post('auth', {
			phone: login,
			password
		}).then(response => userId = response.user_id);
	}

	logout() {
		userId = null;
		return http.del('auth');
	}
}

//
//
///**
// * @param {ApiService} ApiService
// * @param {$localStorage} $localStorage
// * @param {$q} $q
// * @constructor
// */
//function AuthService(ApiService, $localStorage, $q) {
//
//	let ready = $q.defer();
//	let userId;
//
//	return {
//		EVENT_LOGIN_CONFIRMED,
//		EVENT_LOGIN_REQUIRED,
//
//		ERROR_UNAUTHORIZED,
//
//		requestUser() {
//			return $q.when().then(() => {
//				return $localStorage[AUTH_STORAGE_KEY] || this.checkSession().then(userId => {
//						if (!userId) {
//							return $q.reject(new Error(ERROR_UNAUTHORIZED));
//						} else {
//							return ApiService.get(`user/${userId}`).then(user => {
//								return $localStorage[AUTH_STORAGE_KEY] = user;
//							});
//						}
//					});
//			});
//		},
//
//		isAuthorized() {
//			return !!$localStorage[AUTH_STORAGE_KEY];
//		},
//
//		userExists() {
//			return !!$localStorage[AUTH_STORAGE_KEY];
//		},
//
//		login(login, password) {
//			return ApiService.post('auth', {
//				phone: login,
//				password
//			}).then((response) => {
//				userId = response.user_id;
//				return this.requestUser();
//			});
//		},
//
//		logout() {
//			userId = null;
//			delete $localStorage[AUTH_STORAGE_KEY];
//			return ApiService.delete('auth');
//		},
//
//		checkSession() {
//			return $q.when().then(() => {
//				return userId ? userId : ApiService.get('auth').then(response => {
//					return userId = response.user_id;
//				});
//			})
//		},
//
//		isReady: ready.promise,
//		ready() {
//			ready.resolve();
//		}
//	}
//}

//module.exports = AuthService;