import ContactGroup from '../models/ContactGroup.js';

export default function NewGroupController($scope, $ionicLoading, $state) {
	$scope.newGroup = {
		title: ''
	};

	$scope.save = function() {
		let focused = document.querySelector('form input:focus, form textarea:focus');
		if (focused) {
			focused.blur();
		}

		$ionicLoading.show();
		ContactGroup.create($scope.newGroup)
			.then(() => {
				$state.go('app.home.groups');
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