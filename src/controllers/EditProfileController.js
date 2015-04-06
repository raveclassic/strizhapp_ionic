module.exports = function EditProfileController($scope, ApiService, $ionicLoading, $ionicPopup, $state) {

	$scope.data = angular.copy($scope.user);

	$scope.save = function () {
		let focused = document.querySelector('form input:focus, form textarea:focus');
		if (focused) {
			focused.blur();
		}

		$ionicLoading.show({
			template: 'Сохранение...'
		});
		ApiService.put('user/' + $scope.data.id, $scope.data)
			.then(() => {
				$state.go('app.profile');
			})
			.catch((error) => {
				$ionicPopup.alert({
					title: (error.data.name || '') + ' ' + error.data.status,
					template: error.data.message
				});
			})
			.finally(() => {
				$ionicLoading.hide();
			});
	};
};