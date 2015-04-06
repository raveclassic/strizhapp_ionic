let {
	AppController,
	PlaylistsController,
	PostsController,
	PostController,
	NewPostController,
	EditPostController,
	NewGroupController,
	FeedController,
	FeedItemController,
	GroupsController,
	GroupController
	} = require('controllers');

let Helpers = require('util/helpers');

let {DataService} = require('services');

module.exports = function ($stateProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider

		.state('app', {
			abstract: true,
			templateUrl: "templates/menu.html",
			controller: AppController,
			resolve: {
				user($rootScope, ApiService, $localStorage) {
					let user = $localStorage.user;
					if (user) {
						return user;
					} else {
						return ApiService.get('user/8').then((user) => {
							$localStorage.user = user;
							return user;
						})
					}
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
				posts(ApiService, $ionicLoading) {
					$ionicLoading.show({
						template: 'Загрузка'
					});
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
				post($stateParams) {
					return DataService.posts[$stateParams['postId']];
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
				post($stateParams) {
					return DataService.posts[$stateParams['postId']];
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
				feed() {
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
				groups() {
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
				group($stateParams) {
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
		});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/');
};