'use strict';

angular.module('myMovieControllers', ['myMovieServices']);

angular.module('myMovieControllers').controller('IndexController', ['$scope', function ($scope) {

}]);

angular.module('myMovieControllers').controller('AboutController', ['$scope', function ($scope) {

}]);

angular.module('myMovieControllers').controller('WatchController', ['$scope', 'Movie', function ($scope, Movie) {
    var moviesQuery = Movie.get({}, function(movies) {
		$scope.movies = movies.objects;
	});
}]);

angular.module('myMovieControllers').controller('MovieController', ['$scope', '$routeParams', '$sce', 'Movie', function ($scope, $routeParams, $sce, Movie) {
    var movieQuery = Movie.get({ movieId: $routeParams.movieId}, function(movie) {
		$scope.movie = movie;
        $scope.player = {
				sources: [
					{src: $sce.trustAsResourceUrl(movie.location), type: "video/mp4"}
				],
				theme: "/static/css/videogular.css"
			};
	});
}]);

angular.module('myMovieControllers').controller('CreateController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance){
    $scope.createInput = '';

    $scope.ok = function () {
        $uibModalInstance.close($scope.createInput);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

angular.module('myMovieControllers').controller('DownloadController', ['$scope', '$uibModal', function ($scope, $uibModal) {
    $scope.test = 'abc'
    $scope.create = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/static/partials/create.html',
            controller: 'CreateController',
            size: 'lg',
            appendTo: undefined,
        });

        modalInstance.result.then(function (inputs) {
            //$scope.test = JSON.parse(inputs);
            $scope.test = inputs;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
}]);
