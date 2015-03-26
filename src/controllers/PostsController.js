let {DataService} = require('services');

module.exports = function PostsController($scope) {
	$scope.posts = DataService.posts;
};