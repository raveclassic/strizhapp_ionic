let {DataService} = require('services');

module.exports = function PostsController($scope, $state, $ionicViewSwitcher, posts) {
	$scope.posts = posts;

	$scope.goToNewPost = () => {
		$ionicViewSwitcher.nextDirection('forward');
		$state.go('app.newPost');
	};
};