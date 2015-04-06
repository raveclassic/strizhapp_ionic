function AuthService(ApiService) {
	return {
		login(login, password) {
			return ApiService.post('auth', {
				phone: login,
				password
			});
		}
	}
}

module.exports = AuthService;