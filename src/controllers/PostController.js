let {DataService} = require('services');

module.exports = function PostController($scope, post) {
	$scope.post = post;
	console.log(post);
};