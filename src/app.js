require('moment');
require('moment/locale/ru.js');

let faker = require('faker');
faker.locale = 'ru';

let controllers = require('controllers');
let filters = require('filters');
let config = require('./config.js');
let run = require('./run.js');

Object.keys(filters).reduce((m, key) => {
	return m.filter(key, () => filters[key]);
}, angular.module('app.filters', []));

angular.module('app', ['ionic', 'app.filters'])
	.run(run)
	.config(config);