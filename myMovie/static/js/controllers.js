'use strict';

function IndexController($scope) {

}

function AboutController($scope) {

}

function WatchController($scope, Movie) {
    var moviesQuery = Movie.get({}, function(movies) {
		$scope.movies = movies.objects;
	});
}

function MovieController($scope, $routeParams, $sce, Movie) {
    var movieQuery = Movie.get({ movieId: $routeParams.movieId}, function(movie) {
		$scope.movie = movie;
        $scope.player = {
				sources: [
					{src: $sce.trustAsResourceUrl(movie.location), type: "video/mp4"}
				],
				theme: "/static/css/videogular.css"
			};
	});
}

function DownloadController($scope) {

}

function ProgressController($scope) {

}
