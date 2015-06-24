import 'moment';
import 'moment/locale/ru.js';

import 'angular-auto-validate/dist/jcs-auto-validate.js';
//let autoValidateLang = require('angular-auto-validate/dist/lang/jcs-auto-validate_ru-ru.json');
////require('angular-http-auth/src/http-auth-interceptor.js');
//require('ngstorage/ngStorage.js');

import faker from 'faker';
faker.locale = 'ru';

import "babelify/node_modules/babel-core/browser-polyfill.js";

angular
	.module('strizhapp', [
		'ionic',
		'jcs-autoValidate',
		require('./filters').name,
		require('./services').name,
		require('./components').name
	])
	.run(require('./run.js'))
	.config(require('./config.js'));

//
//// Credits: Adam's answer in http://stackoverflow.com/a/20786262/69362
//// Paste this in browser's console
//var $rootScope = angular.element(document.querySelectorAll("[ui-view]")[0]).injector().get('$rootScope');
//
