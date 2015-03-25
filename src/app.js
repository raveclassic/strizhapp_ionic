let controllers = require('controllers');
let config = require('./config.js');
let run = require('./run.js');

angular.module('App', ['ionic'])
	.run(run)
	.config(config);