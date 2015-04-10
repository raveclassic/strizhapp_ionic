function LoginController($state, $scope, AuthService, $ionicLoading, $ionicPopup, $q, $timeout) {
	if (AuthService.isAuthorized()) {
		$state.go('app.home.posts');
	}

	$scope.loginData = {
		phone: '',
		password: ''
	};

	$scope.doLogin = () => {
		$ionicLoading.show();
		AuthService.login($scope.loginData.phone, $scope.loginData.password)
			.then(() => {
				$timeout(() => {
					$state.go('app.home.posts');
				});
			})
			.catch((error) => {
				if (error.status === 401) {
					$ionicPopup.alert({
						title: "Ошибка",
						template: 'Неверный пароль'
					});
				} else {
					console.log(error);
					$q.reject(error);
				}
			})
			.finally(() => {
				$ionicLoading.hide();
			});
	};
}

module.exports = LoginController;