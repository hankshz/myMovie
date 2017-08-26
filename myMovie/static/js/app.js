'use strict';

angular.module('myMovie',
        [
            'ngRoute',
            "ngSanitize",
            "ngAnimate",
            'ui.bootstrap',
            'angularFileUpload',
            "com.2fdevs.videogular",
            "com.2fdevs.videogular.plugins.controls",
            "com.2fdevs.videogular.plugins.overlayplay",
            "com.2fdevs.videogular.plugins.poster",
            'myMovieControllers',
            'myMovieServices'
        ]
    )
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: '/static/partials/landing.html',
            controller: 'IndexController'
        })
        .when('/about', {
            templateUrl: '/static/partials/about.html',
            controller: 'AboutController'
        })
        .when('/watch', {
            templateUrl: '/static/partials/watch.html',
            controller: 'WatchController'
        })
        .when('/movie', {
            templateUrl: '/static/partials/watch.html',
            controller: 'WatchController'
        })
        .when('/movie/:movieId', {
            templateUrl: '/static/partials/movie.html',
            controller: 'MovieController',
            controllerAs: "controller"
        })
        .when('/download', {
            templateUrl: '/static/partials/download.html',
            controller: 'DownloadController'
        })
        .otherwise({
            redirectTo: '/'
        })
        ;

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }])
;
