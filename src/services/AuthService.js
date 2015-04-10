const EVENT_LOGIN_REQUIRED = 'EVENT_LOGIN_REQUIRED';
const EVENT_LOGIN_CONFIRMED = 'EVENT_LOGIN_CONFIRMED';

const ERROR_UNAUTHORIZED = 'ERROR_UNAUTHORIZED';

const AUTH_STORAGE_KEY = 'AUTH_STORAGE_KEY';

/**
 * @param {ApiService} ApiService
 * @param {$localStorage} $localStorage
 * @param {$q} $q
 * @constructor
 */
function AuthService(ApiService, $localStorage, $q) {

	let ready = $q.defer();

	return {
		EVENT_LOGIN_CONFIRMED,
		EVENT_LOGIN_REQUIRED,

		ERROR_UNAUTHORIZED,

		requestUser() {
			return $q.when().then(() => {
				return $q.reject(new Error(ERROR_UNAUTHORIZED));
				return $localStorage[AUTH_STORAGE_KEY] || this.checkSession().then(userId => {
						if (!userId) {
							throw new Error(ERROR_UNAUTHORIZED);
						} else {
							return ApiService.get(`user/${userId}`).then(user => {
								return $localStorage[AUTH_STORAGE_KEY] = user;
							});
						}
					});
			});
		},

		isAuthorized() {
			return !!$localStorage[AUTH_STORAGE_KEY];
		},

		userExists() {
			return !!$localStorage[AUTH_STORAGE_KEY];
		},

		login(login, password) {
			return ApiService.post('auth', {
				phone: login,
				password
			});
		},

		logout() {
			delete $localStorage[AUTH_STORAGE_KEY];
			return ApiService.delete('auth');
		},

		checkSession() {
			return ApiService.get('auth').then(response => response.user_id);
		},

		isReady: ready.promise,
		ready() {
			ready.resolve();
		}
	}
}

module.exports = AuthService;