let {
	AppController,
	PlaylistsController,
	PostsController,
	PostController,
	NewPostController,
	EditPostController,
	NewGroupController
	} = require('controllers');

let {DataService} = require('services');

module.exports = function ($stateProvider, $urlRouterProvider) {
	$stateProvider

		.state('app', {
			abstract: true,
			templateUrl: "templates/menu.html",
			controller: AppController
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
				posts() {
					return DataService.posts;
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
			views: {
				feed: {
					templateUrl: "templates/home/feed.html"
				}
			}
		})

		.state('app.home.feedItem', {
			url: "/feed/:feedId",
			views: {
				feed: {
					templateUrl: "templates/home/post.html"
				}
			}
		})

		.state('app.home.groups', {
			url: "/groups",
			views: {
				'groups': {
					templateUrl: "templates/home/groups.html"
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

		.state('app.search', {
			url: "/search",
			views: {
				'menuContent': {
					templateUrl: "templates/search.html"
				}
			}
		})

		.state('app.browse', {
			url: "/browse",
			views: {
				'menuContent': {
					templateUrl: "templates/browse.html"
				}
			}
		})

		.state('app.playlists', {
			url: "/playlists",
			views: {
				'menuContent': {
					templateUrl: "templates/playlists.html",
					controller: PlaylistsController
				}
			}
		})

		.state('app.single', {
			url: "/playlists/:playlistId",
			views: {
				'menuContent': {
					templateUrl: "templates/playlist.html"
				}
			}
		});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/');
};