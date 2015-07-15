export default function ($stateProvider, $urlRouterProvider, $httpProvider, API_URL) {

	//DSProvider.defaults.basePath = (document.location && document.location.protocol || 'http:') +
	// '//strizhapi.herokuapp.com/api/v1/'; DSProvider.defaults.debug = false;
	//HttpAdapterProvider.basePath = (document.location && document.location.protocol || 'http:') +
	// '//strizhapi.herokuapp.com/api/v1/';

	$httpProvider.defaults.withCredentials = true;

	$stateProvider

		.state('app', {
			abstract: true,
			templateUrl: "components/app/app.layout.html",
			controller: 'AppController',
			resolve: {
				currentUser(AuthService) {
					return AuthService.requestUser();
				}
			}
		})

		.state('app.profile', {
			url: '/profile',
			templateUrl: "components/app/profile/profile.html",
			controller: 'ProfileController',
			resolve: {
				user(currentUser) {
					return currentUser;
				}
			}
		})

		.state('app.feed', {
			url: "/feed",
			resolve: {
				feed(currentUser, DataService) {
					return DataService.feed;
				}
			},
			controller: 'FeedController',
			templateUrl: "components/app/feed/feed.html"
		})

		.state('app.posts', {
			url: "/posts",
			resolve: {
				posts($ionicLoading, currentUser, PostModel) {
					$ionicLoading.show();
					return PostModel.findAll({
						order: {
							created_at: 'DESC'
						}
					}, {
						bypassCache: true
					}).then(posts => {
						$ionicLoading.hide();
						return posts;
					});
				}
			},
			templateUrl: "components/app/posts/posts.html",
			controller: 'PostsController'
		})

		.state('app.newPost', {
			url: "/posts/new",
			resolve: {
				post(currentUser) {
					return null;
				},
				mode(currentUser) {
					return 'new';
				}
			},
			templateUrl: "components/app/posts/post-edit.html",
			controller: 'PostController'
		})

		.state('app.post', {
			url: "/posts/{postId:int}",
			resolve: {
				post($stateParams, $ionicLoading, currentUser, PostModel) {
					$ionicLoading.show();
					return PostModel.find($stateParams['postId']).then(post => {
						$ionicLoading.hide();
						return post;
					});
				},
				mode(currentUser) {
					return 'view';
				}
			}
		})

		//.state('app.home.post', {
		//	url: "/posts/{postId:int}",
		//	resolve: {
		//		post($stateParams, $ionicLoading, currentUser) {
		//			$ionicLoading.show();
		//			return Post.find($stateParams['postId']).then(post => {
		//				$ionicLoading.hide();
		//				return post;
		//			});
		//			//return ApiService.get('post/' + $stateParams['postId'])
		//			//	.then((response) => {
		//			//		$ionicLoading.hide();
		//			//		return response;
		//			//	});
		//		}
		//	},
		//	views: {
		//		posts: {
		//			templateUrl: "templates/home/post.html",
		//			controller: 'PostController'
		//		}
		//	}
		//})

		//.state('app.home.editPost', {
		//	url: "/posts/{postId:int}/edit",
		//	resolve: {
		//		post($stateParams, ApiService, $ionicLoading, currentUser) {
		//			$ionicLoading.show();
		//			return Post.find($stateParams['postId']).then((response) => {
		//				$ionicLoading.hide();
		//				return response;
		//			});
		//		}
		//	},
		//	views: {
		//		posts: {
		//			templateUrl: "templates/home/edit-post.html",
		//			controller: 'EditPostController'
		//		}
		//	}
		//})
		//

		//.state('app.home.feedItem', {
		//	url: "/feed/:feedItemId",
		//	resolve: {
		//		feedItem($stateParams, DataService) {
		//			return DataService.feed[$stateParams['feedItemId']]
		//		}
		//	},
		//	views: {
		//		feed: {
		//			templateUrl: "templates/home/feed-item.html",
		//			controller: 'FeedItemController'
		//		}
		//	}
		//})

		//.state('app.home.groups', {
		//	url: "/groups",
		//	resolve: {
		//		groups(currentUser, $ionicLoading) {
		//			$ionicLoading.show();
		//			return ContactGroup.findAll({
		//				order: {
		//					created_at: 'DESC'
		//				}
		//			}, {
		//				bypassCache: true
		//			}).then(groups => {
		//				$ionicLoading.hide();
		//				return groups;
		//			});
		//		}
		//	},
		//	views: {
		//		groups: {
		//			templateUrl: "templates/home/groups.html",
		//			controller: 'GroupsController'
		//		}
		//	}
		//})
		//
		//.state('app.home.newGroup', {
		//	url: "/groups/new",
		//	views: {
		//		groups: {
		//			templateUrl: "templates/home/new-group.html",
		//			controller: 'NewGroupController'
		//		}
		//	}
		//})
		//
		//.state('app.home.editGroup', {
		//	url: "/groups/{groupId:int}/edit",
		//	resolve: {
		//		group($stateParams, $ionicLoading, currentUser) {
		//			$ionicLoading.show();
		//			return ContactGroup.find($stateParams['groupId']).then((response) => {
		//				$ionicLoading.hide();
		//				return response;
		//			});
		//		}
		//	},
		//	views: {
		//		groups: {
		//			templateUrl: "templates/home/edit-group.html",
		//			controller: 'EditGroupController'
		//		}
		//	}
		//})
		//
		//.state('app.home.group', {
		//	url: '/groups/:groupId',
		//	resolve: {
		//		group($stateParams, currentUser, $ionicLoading) {
		//			$ionicLoading.show();
		//			return ContactGroup.find($stateParams['groupId']).then(group => {
		//				$ionicLoading.hide();
		//				return group;
		//			});
		//		}
		//	},
		//	views: {
		//		groups: {
		//			templateUrl: "templates/home/group.html",
		//			controller: 'GroupController'
		//		}
		//	}
		//})

		//.state('app.editProfile', {
		//	url: '/profile/edit',
		//	//resolve: {
		//	//	user($scope) {
		//	//		return $scope.user;
		//	//	}
		//	//},
		//	views: {
		//		menuContent: {
		//			templateUrl: "templates/profile/profile-edit.html",
		//			controller: 'EditProfileController'
		//		}
		//	}
		//})

		.state('login', {
			abstract: true,
			templateUrl: "components/login/login.layout.html",
			controller: 'LoginController'
		})

		.state('login.signin', {
			url: '/signin',
			templateUrl: "components/login/login.signin.html"
		})

		.state('login.signup', {
			url: '/signup',
			templateUrl: "components/login/login.signup.html"
		});

	////TODO: research js-data-angular + intercept js-data requests with $ionicLoading
	//$httpProvider.interceptors.push($rootScope => {
	//	return {
	//		request(config) {
	//			if (config.url.indexOf(API_URL) !== -1) {
	//				$rootScope.$broadcast('loading:show');
	//			}
	//			return config;
	//		},
	//		response(response) {
	//			if (response.config.url.indexOf(API_URL) !== -1) {
	//				$rootScope.$broadcast('loading:hide')
	//			}
	//			return response;
	//		}
	//	}
	//});

	$urlRouterProvider.otherwise('/feed');
}