export default angular
	.module('PostsComponent', [
		require('./posts.controller.js').name,
		require('./post.controller.js').name
	]);