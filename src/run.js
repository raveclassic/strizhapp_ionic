import {ERROR_UNAUTHORIZED} from 'services/AuthService.js';

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

		$rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
			if (error == ERROR_UNAUTHORIZED) {
				event.preventDefault();
				$state.go('login.signin');
			} else {
				throw error;
			}
		});
	});
};