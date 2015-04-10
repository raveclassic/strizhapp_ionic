module.exports = function ($ionicPlatform, $rootScope, $state, AuthService, $ionicModal, $timeout, $q) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});

	//$rootScope.$on('$stateChangeStart', (event, toState) => {
	//	if (toState.name === 'login') return;
	AuthService.requestUser()
		.finally(() => {
			AuthService.ready();
		});
	//});

	$rootScope.user = null;
	//$rootScope.$on('$stateChangeStart', (event) => {
	//	if (!AuthService.isAuthorized()) {
	//		$rootScope.$emit(AuthService.EVENT_LOGIN_REQUIRED);
	//	}
	//});

	window.AuthService = AuthService;
};