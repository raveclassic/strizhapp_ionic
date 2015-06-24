export default angular.module('FeedController', [])
	.controller('FeedController', ($scope, feed) => {
		$scope.feed = feed;
	});