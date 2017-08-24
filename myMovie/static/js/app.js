'use strict';

angular.module('myMovie', ['myMovieServices'])
	.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/static/partials/landing.html',
			controller: IndexController
		})
		.when('/about', {
			templateUrl: '/static/partials/about.html',
			controller: AboutController
		})
		.when('/watch', {
			templateUrl: '/static/partials/watch.html',
			controller: WatchController
		})
		.when('/movie', {
			templateUrl: '/static/partials/watch.html',
			controller: WatchController
		})
		.when('/movie/:movieId', {
			templateUrl: '/static/partials/movie.html',
			controller: MovieController
		})
		.when('/download', {
			templateUrl: '/static/partials/download.html',
			controller: DownloadController
		})
		.when('/progress', {
			templateUrl: '/static/partials/progress.html',
			controller: ProgressController
		})
		.otherwise({
			redirectTo: '/'
		})
		;

		$locationProvider.html5Mode(true);
	}])
;
