const EVENT_LOGIN_REQUIRED = 'EVENT_LOGIN_REQUIRED';
const EVENT_LOGIN_CONFIRMED = 'EVENT_LOGIN_CONFIRMED';

const AUTH_STORAGE_KEY = 'AUTH_STORAGE_KEY';

function AuthService($rootScope, ApiService, $localStorage) {

	return {
		EVENT_LOGIN_CONFIRMED,
		EVENT_LOGIN_REQUIRED,

		login(login, password) {
			return ApiService.post('auth', {
				phone: login,
				password
			}).then(user => {
				$localStorage[AUTH_STORAGE_KEY] = user;
			});
		},

		logout() {
			return ApiService.delete('auth');
		}
	}
}

module.exports = AuthService;