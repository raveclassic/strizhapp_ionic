export default angular.module('PostsController', [])
	.controller('PostsController', ($scope, $state, $ionicViewSwitcher, posts) => {
		$scope.posts = posts;

		//$scope.goToNewPost = () => {
		//	$ionicViewSwitcher.nextDirection('forward');
		//	$state.go('app.newPost');
		//};
	});