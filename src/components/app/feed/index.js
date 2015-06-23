export default angular
	.module('FeedComponent', [])
	.controller('FeedController', ($scope, feed) => {
		$scope.feed = feed;
	});