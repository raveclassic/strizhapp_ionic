export default function ($ionicPlatform, $rootScope, $state, AuthService) {
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
			if (error == AuthService.ERROR_UNAUTHORIZED) {
				event.preventDefault();
				$state.go('login.signin');
			} else {
				throw error;
			}
		});
	});

	//DEBUG

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		console.info('NAVIGATION:', '$stateChangeStart', toState, toParams);
	});

	$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
		console.info('NAVIGATION:', '$stateChangeError', arguments);
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		console.info('NAVIGATION:', '$stateChangeSuccess', toState);
	});

	$rootScope.$on('$viewContentLoaded', function (event) {
		console.info('NAVIGATION:', '$viewContentLoaded', event);
	});

	$rootScope.$on('$stateNotFound', function (event, notfoundState, fromState, fromParams) {
		console.info('NAVIGATION:', '$stateNotFound', notfoundState);
	});
}