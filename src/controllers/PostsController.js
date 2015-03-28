let {DataService} = require('services');

module.exports = function PostsController($scope, $state, $ionicViewSwitcher) {
	$scope.posts = DataService.posts;

	$scope.goToNewPost = () => {
		$ionicViewSwitcher.nextDirection('forward');
		$state.go('app.newPost');
	};
};