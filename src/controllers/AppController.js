module.exports = function AppController($rootScope, $scope, $ionicModal, $timeout, AuthService, $state, $ionicLoading, currentUser) {

	$rootScope.currentUser = currentUser;

	$rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
		if (toState.name !== 'login.signin' && !AuthService.isAuthorized()) {
			event.preventDefault();
			$state.go('login.signin');
		}
	});

	$scope.logout = () => {
		$ionicLoading.show();
		AuthService.logout().finally(() => {
			$ionicLoading.hide();
			$state.go('login.signin');
		});
	};
};