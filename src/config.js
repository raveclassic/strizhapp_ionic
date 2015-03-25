let {AppController, PlaylistsController} = require('controllers');

module.exports = function($stateProvider, $urlRouterProvider) {
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
			views: {
				posts: {
					templateUrl: "templates/home/posts.html"
				}
			}
		})

		.state('app.home.post', {
			url: "/posts/:postId",
			views: {
				posts: {
					templateUrl: "templates/home/post.html"
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
					templateUrl: "templates/playlist.html",
					controller: PlaylistsController
				}
			}
		});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/');
};