import Post from '../models/Post.js';

export default function EditPostController($scope, post, $ionicLoading, $ionicPopup, ApiService, $state, $ionicHistory) {
	window.$ionicHistory = $ionicHistory;
	$scope.post = angular.copy(post);

	$scope.save = function () {
		let focused = document.querySelector('form input:focus, form textarea:focus');
		if (focused) {
			focused.blur();
		}

		$ionicLoading.show();
		Post.update($scope.post.id, $scope.post)
			.then(() => {
				$state.go('app.home.posts');
			})
			.catch(error => {
				$ionicPopup.alert({
					title: error.data.name + ' ' + error.data.status,
					template: error.data.message
				});
			})
			.finally(() => {
				$ionicLoading.hide();
			});
		//	$scope.newPost.real_price = $scope.newPost.price;
		//	ApiService.post('post', $scope.newPost)
		//		.then(() => {
		//			$state.go('app.home.posts');
		//		})
		//		.catch((error) => {
		//			$ionicPopup.alert({
		//				title: error.data.name + ' ' + error.data.status,
		//				template: error.data.message
		//			});
		//		})
		//		.finally(() => {
		//			$ionicLoading.hide();
		//		});
	};

	$scope['delete'] = function () {
		$ionicLoading.show();
		Post.destroy(post.id)
			.then(() => {
				try {
					$ionicHistory.goBack(-2);
				} catch (e) {
					$state.go('app.home.posts');
				}
			})
			.catch((error) => {
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