let {
	AppController,
	LoginController,
	PlaylistsController,
	PostsController,
	PostController,
	NewPostController,
	EditPostController,
	NewGroupController,
	FeedController,
	FeedItemController,
	GroupsController,
	GroupController,
	EditProfileController
	} = require('controllers');

let Helpers = require('util/helpers');

let {DataService} = require('services');

module.exports = function ($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state('app', {
			abstract: true,
			templateUrl: "templates/menu.html",
			controller: AppController,
			resolve: {
				ready(AuthService, $q, $state) {
					let deferred = $q.defer();
					AuthService.requestUser()
						.then(user => {
							deferred.resolve(user);
						})
						.catch((error) => {
							deferred.reject();
							if (error.message === AuthService.ERROR_UNAUTHORIZED) {
								$state.go('login');
							}
						});
					return deferred.promise;
				},
				user(AuthService, ready) {
					return AuthService.requestUser();
				}
			}
		})

		.state('app.home', {
			abstract: true,
			views: {
				'menuContent': {
					templateUrl: "templates/home.html"
				}
			}
		})

		.state('app.home.posts', {
			url: "/",
			resolve: {
				posts(ApiService, $ionicLoading, ready) {
					$ionicLoading.show();
					return ApiService.get('post', {
						order: {
							created_at: 'desc'
						}
					}).then((response) => {
						$ionicLoading.hide();
						return response.items.post;
					});
				}
			},
			views: {
				posts: {
					templateUrl: "templates/home/posts.html",
					controller: PostsController
				}
			}
		})

		.state('app.home.newPost', {
			url: "/posts/new",
			views: {
				posts: {
					templateUrl: "templates/home/new-post.html",
					controller: NewPostController
				}
			}
		})

		.state('app.home.post', {
			url: "/posts/{postId:int}",
			resolve: {
				post($stateParams, ApiService, $ionicLoading, ready) {
					$ionicLoading.show();
					return ApiService.get('post/' + $stateParams['postId'])
						.then((response) => {
							$ionicLoading.hide();
							return response;
						});
				}
			},
			views: {
				posts: {
					templateUrl: "templates/home/post.html",
					controller: PostController
				}
			}
		})

		.state('app.home.editPost', {
			url: "/posts/{postId:int}/edit",
			resolve: {
				post($stateParams, ApiService, $ionicLoading, ready) {
					$ionicLoading.show();
					return ApiService.get('post/' + $stateParams['postId'])
						.then((response) => {
							$ionicLoading.hide();
							return response;
						});
				}
			},
			views: {
				posts: {
					templateUrl: "templates/home/edit-post.html",
					controller: EditPostController
				}
			}
		})

		.state('app.home.feed', {
			url: "/feed",
			resolve: {
				feed(ready) {
					return DataService.feed;
				}
			},
			views: {
				feed: {
					templateUrl: "templates/home/feed.html",
					controller: FeedController
				}
			}
		})

		.state('app.home.feedItem', {
			url: "/feed/:feedItemId",
			resolve: {
				feedItem($stateParams) {
					return DataService.feed[$stateParams['feedItemId']]
				}
			},
			views: {
				feed: {
					templateUrl: "templates/home/feed-item.html",
					controller: FeedItemController
				}
			}
		})

		.state('app.home.groups', {
			url: "/groups",
			resolve: {
				groups(ready) {
					return DataService.groups;
				}
			},
			views: {
				groups: {
					templateUrl: "templates/home/groups.html",
					controller: GroupsController
				}
			}
		})

		.state('app.home.newGroup', {
			url: "/groups/new",
			views: {
				groups: {
					templateUrl: "templates/home/new-group.html",
					controller: NewGroupController
				}
			}
		})

		.state('app.home.group', {
			url: '/groups/:groupId',
			resolve: {
				group($stateParams, ready) {
					return DataService.groups[$stateParams['groupId']];
				}
			},
			views: {
				groups: {
					templateUrl: "templates/home/group.html",
					controller: GroupController
				}
			}
		})

		.state('app.profile', {
			url: '/profile',
			views: {
				menuContent: {
					templateUrl: "templates/profile/profile-index.html"
				}
			}
		})

		.state('app.editProfile', {
			url: '/profile/edit',
			//resolve: {
			//	user($scope) {
			//		return $scope.user;
			//	}
			//},
			views: {
				menuContent: {
					templateUrl: "templates/profile/profile-edit.html",
					controller: EditProfileController
				}
			}
		})

		.state('login', {
			url: '/login',
			templateUrl: "templates/login.html",
			controller: LoginController
		});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/');
};