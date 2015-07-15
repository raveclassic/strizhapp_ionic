export default angular.module('ProfileController', [])
	.controller('ProfileController', ($scope, user, UserModel) => {
		$scope.user = user;

		$scope.save = (event) => {

		}
	});