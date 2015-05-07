import Post from 'models/Post.js';

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

module.exports = function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

	//$locationProvider.html5Mode(true);

	$stateProvider

		.state('app', {
			abstract: true,
			templateUrl: "templates/menu.html",
			controller: AppController,
			resolve: {
				currentUser(AuthService) {
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
				posts($ionicLoading, currentUser) {
					$ionicLoading.show();
					return Post.findAll({
						order: {
							created_at: 'DESC'
						}
					}).then(posts => {
						$ionicLoading.hide();
						return posts;
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
				post($stateParams, $ionicLoading, currentUser) {
					$ionicLoading.show();
					return Post.find($stateParams['postId']).then(post => {
						$ionicLoading.hide();
						return post;
					});
					//return ApiService.get('post/' + $stateParams['postId'])
					//	.then((response) => {
					//		$ionicLoading.hide();
					//		return response;
					//	});
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
				post($stateParams, ApiService, $ionicLoading, currentUser) {
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
				feed(currentUser) {
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
				groups(currentUser) {
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
				group($stateParams, currentUser) {
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
			abstract: true,
			templateUrl: "templates/login.html",
			controller: LoginController
		})

		.state('login.signin', {
			url: '/signin',
			templateUrl: "templates/login/signin.html"
		})

		.state('login.signup', {
			url: '/signup',
			templateUrl: "templates/login/signup.html"
		});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/');
};