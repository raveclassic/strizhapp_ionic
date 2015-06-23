//import 'bluebird';
//
//require('moment');
//require('moment/locale/ru.js');
//require('angular-auto-validate/dist/jcs-auto-validate.js');
//let autoValidateLang = require('angular-auto-validate/dist/lang/jcs-auto-validate_ru-ru.json');
////require('angular-http-auth/src/http-auth-interceptor.js');
//require('ngstorage/ngStorage.js');
//
//let faker = require('faker');
//faker.locale = 'ru';
//
//let controllers = require('controllers');
//let filters = require('filters');
//let services = require('services');
//let config = require('./config.js');
//let run = require('./run.js');
//
//let app = angular.module('app', ['ionic', 'jcs-autoValidate', 'ngStorage']);
//
//Object.keys(filters).forEach(key => app.filter(key, () => filters[key]));
//Object.keys(services).forEach(key => {
//	let service = services[key];
//	service = service.default || service;
//	app.service(key, service);
//});
//
//app.run(run).config(config);

//import "./components/";

angular
	.module('strizhapp', [
		'ionic',
		require('./filters').name,
		require('./services').name,
		require('./components').name
	])
	.run(($ionicPlatform, $rootScope, $state, AuthService) => {
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
	})
	.config(require('./config.js'));