module.exports = {
	AppController: require('./AppController.js'),
	PlaylistsController: require('./PlaylistsController.js'),
	PostsController: require('./PostsController.js'),
	PostController: require('./PostController.js'),
	NewPostController: require('./NewPostController.js'),
	EditPostController: require('./EditPostController.js'),
	NewGroupController: require('./NewGroupController.js')
};

//Object.keys(module.exports).reduce((m, key) => {
//	return m.controller(key, module.exports[key]);
//}, angular.module('app.controllers', []));