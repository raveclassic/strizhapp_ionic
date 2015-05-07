function LoginController($state, $scope, AuthService, $ionicLoading, $ionicPopup, $q, $timeout, ApiService) {

	AuthService.isAuthorized().then((authorized) => {
		if (authorized) {
			$state.go('app.home.posts');
		}
	});

	$scope.signinData = {
		phone: '',
		password: ''
	};

	$scope.signupData = {
		phone: '',
		password: ''
	};

	$scope.signin = () => {
		$ionicLoading.show();
		AuthService.login($scope.signinData.phone, $scope.signinData.password)
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
					throw error;
				}
			})
			.finally(() => {
				$ionicLoading.hide();
			});
	};

	$scope.signup = () => {
		$ionicLoading.show();
		let data = {
			phone: $scope.signupData.phone,
			password: $scope.signupData.password
		};
		ApiService.post('user', data)
			.then(() => {
				$ionicLoading.hide();
				return AuthService.login($scope.signupData.phone, $scope.signupData.password)
					.then(() => {
						$timeout($state.go.bind($state, 'app.home.posts'));
					});
			})
			.catch(error => {
				$ionicPopup.alert({
					title: "Ошибка " + error.status,
					template: JSON.stringify(error.data)
				});
			})
			.finally($ionicLoading.hide);
	};

	$scope.restorePassword = () => {
		alert('password restore not implemented');
	};
}

module.exports = LoginController;