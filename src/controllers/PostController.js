let {DataService} = require('services');

module.exports = function PostController($scope, $stateParams) {
	$scope.post = DataService.posts[$stateParams['postId']];
};