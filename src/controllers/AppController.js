module.exports = function AppController($scope, $ionicModal, $timeout, AuthenticationService, user) {
	// Form data for the login modal
	$scope.loginData = {};

	$scope.user = user;

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope,
		focusFirstInput: true
	}).then(function (modal) {
		$scope.loginModal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function () {
		$scope.loginModal.hide();
	};

	// Open the login modal
	$scope.login = function () {
		$scope.loginModal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function () {
		AuthenticationService.login($scope.loginData.username, $scope.loginData.password)
			.then(console.log.bind(console));
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function () {
			$scope.closeLogin();
		}, 1000);
	};

	$scope.$on('$destroy', function () {
		$scope.loginModal.remove();
	});
};