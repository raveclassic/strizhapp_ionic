require('moment');
require('moment/locale/ru.js');

let faker = require('faker');
faker.locale = 'ru';

let controllers = require('controllers');
let filters = require('filters');
let services = require('services');
let config = require('./config.js');
let run = require('./run.js');

Object.keys(filters).reduce((m, key) => {
	return m.filter(key, () => filters[key]);
}, angular.module('app.filters', []));

Object.keys(services).reduce((m, key) => {
	return m.service(key, services[key]);
}, angular.module('app.services', []));

angular.module('app', ['ionic', 'app.filters', 'app.services'])
	.run(run)
	.config(config);