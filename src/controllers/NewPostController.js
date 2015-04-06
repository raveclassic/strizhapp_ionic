module.exports = function NewPostController($scope, ApiService, $ionicLoading, $ionicPopup, $state) {
	$scope.newPost = {
		title: '',
		description: '',
		price: ''
	};
	$scope.save = function() {
		let focused = document.querySelector('form input:focus, form textarea:focus');
		if (focused) {
			focused.blur();
		}

		$ionicLoading.show({
			template: 'Загрузка...'
		});
		$scope.newPost.real_price = $scope.newPost.price;
		ApiService.post('post', $scope.newPost)
			.then(() => {
				$state.go('app.home.posts');
			})
			.catch((error) => {
				$ionicPopup.alert({
					title: error.data.name + ' ' + error.data.status,
					template: error.data.message
				});
			})
			.finally(() => {
				$ionicLoading.hide();
			});
	};
};