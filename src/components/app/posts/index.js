export default angular
	.module('PostsComponent', [])
	.controller('PostsController', ($scope, $state, $ionicViewSwitcher, posts) => {
		$scope.posts = posts;

		$scope.goToNewPost = () => {
			$ionicViewSwitcher.nextDirection('forward');
			$state.go('app.newPost');
		};
	})
	.controller('PostController', ($scope, post) => {
		$scope.post = post;
	});