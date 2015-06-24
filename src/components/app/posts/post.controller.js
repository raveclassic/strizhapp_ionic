export default angular.module('PostController', [])
	.controller('PostController', ($scope, post, mode) => {
		$scope.mode = mode;
		$scope.post = post || {};

		switch (mode) {
			case 'view':
			{
				break;
			}
			case 'new':
			{
				$scope.viewTitle = 'Новая тема';
				break;
			}
			case 'edit':
			{
				$scope.viewTitle = 'Редактирование';
				break;
			}
			default:
			{
				throw new Error('Unknown PostController mode', mode);
			}
		}

		$scope.remove = () => {

		};

		$scope.save = () => {

		};
	});