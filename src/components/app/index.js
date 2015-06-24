export default angular
	.module('AppComponent', [
		require('./contacts').name,
		require('./feed').name,
		require('./posts').name,
		require('./profile').name,
		require('./services').name,
		require('./app.controller.js').name
	]);