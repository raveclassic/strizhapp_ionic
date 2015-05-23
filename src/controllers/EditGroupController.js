import ContactGroup from '../models/ContactGroup.js';

export default function EditGroupController($scope, group, $ionicLoading, $state) {
	$scope.group = angular.copy(group);

	$scope.save = function() {
		let focused = document.querySelector('form input:focus, form textarea:focus');
		if (focused) {
			focused.blur();
		}

		$ionicLoading.show();
		ContactGroup.save($scope.group)
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

	$scope.delete = function() {
		$ionicLoading.show();
		ContactGroup.destroy(group.id).then(() => {
			$ionicLoading.hide();
			$state.go('app.home.groups');
		});
	};
};