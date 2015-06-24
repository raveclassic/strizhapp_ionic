export default angular
	.module('Models', [
		require('../util/adapter.js').name
	])
	.factory('PostModel', DS => DS.defineResource('post'))
	.factory('UserModel', DS => DS.defineResource('user'));