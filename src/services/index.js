export default angular.module('Services', [
	require('./ApiService.js').name,
	require('./AuthService.js').name,
	require('./DataService.js').name
]);