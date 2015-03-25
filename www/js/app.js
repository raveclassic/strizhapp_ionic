(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _require = require("controllers");

var App = _require.App;
var Playlists = _require.Playlists;

module.exports = function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state("app", {
		abstract: true,
		templateUrl: "templates/menu.html",
		controller: App
	}).state("app.home", {
		abstract: true,
		views: {
			menuContent: {
				templateUrl: "templates/home.html"
			}
		}
	}).state("app.home.posts", {
		url: "/",
		views: {
			posts: {
				templateUrl: "templates/home/posts.html"
			}
		}
	}).state("app.home.post", {
		url: "/posts/:postId",
		views: {
			posts: {
				templateUrl: "templates/home/post.html"
			}
		}
	}).state("app.home.feed", {
		url: "/feed",
		views: {
			feed: {
				templateUrl: "templates/home/feed.html"
			}
		}
	}).state("app.home.feedItem", {
		url: "/feed/:feedId",
		views: {
			feed: {
				templateUrl: "templates/home/post.html"
			}
		}
	}).state("app.home.groups", {
		url: "/groups",
		views: {
			groups: {
				templateUrl: "templates/home/groups.html"
			}
		}
	}).state("app.search", {
		url: "/search",
		views: {
			menuContent: {
				templateUrl: "templates/search.html"
			}
		}
	}).state("app.browse", {
		url: "/browse",
		views: {
			menuContent: {
				templateUrl: "templates/browse.html"
			}
		}
	}).state("app.playlists", {
		url: "/playlists",
		views: {
			menuContent: {
				templateUrl: "templates/playlists.html",
				controller: Playlists
			}
		}
	}).state("app.single", {
		url: "/playlists/:playlistId",
		views: {
			menuContent: {
				templateUrl: "templates/playlist.html",
				controller: Playlists
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise("/");
};

},{"controllers":4}],2:[function(require,module,exports){
"use strict";

module.exports = function AppController($scope, $ionicModal, $timeout) {
	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl("templates/login.html", {
		scope: $scope
	}).then(function (modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function () {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function () {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function () {
		console.log("Doing login", $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function () {
			$scope.closeLogin();
		}, 1000);
	};
};

},{}],3:[function(require,module,exports){
"use strict";

module.exports = function PlaylistsController($scope) {
	$scope.playlists = [{ title: "Reggae", id: 1 }, { title: "Chill", id: 2 }, { title: "Dubstep", id: 3 }, { title: "Indie", id: 4 }, { title: "Rap", id: 5 }, { title: "Cowbell", id: 6 }];
};

},{}],4:[function(require,module,exports){
"use strict";

module.exports = {
	App: require("./App.js"),
	Playlists: require("./Playlists.js")
};

},{"./App.js":2,"./Playlists.js":3}],5:[function(require,module,exports){
"use strict";

module.exports = function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
};

},{}],6:[function(require,module,exports){
"use strict";

var controllers = require("controllers");
var config = require("./config.js");
var run = require("./run.js");

angular.module("App", ["ionic"]).run(run).config(config);

},{"./config.js":1,"./run.js":5,"controllers":4}]},{},[6]);
