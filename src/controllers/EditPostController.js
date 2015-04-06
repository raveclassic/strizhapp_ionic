module.exports = function EditPostController($scope, post, $ionicLoading, $ionicPopup, ApiService, $state) {
	$scope.post = post;

	$scope['delete'] = function () {
		$ionicLoading.show({
			template: 'Удаление'
		});
		ApiService.delete('post/' + post.id)
			.then(() => {
				$state.go('app.home.posts');
			}).
			catch((error) => {
				$ionicPopup.alert({
					title: error.name + ' ' + error.status,
					template: error.message
				});
			})
			.finally(() => {
				$ionicLoading.hide();
			});
	}
};