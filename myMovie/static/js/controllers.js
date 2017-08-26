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

angular.module('myMovieControllers').controller('CreateController', ['$scope', '$uibModalInstance', 'FileUploader', function($scope, $uibModalInstance, FileUploader){
    var uploader = $scope.uploader = new FileUploader({
            url: 'fileUpload'
        });

        // FILTERS

        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                console.log('syncFilter');
                return this.queue.length < 10;
            }
        });

        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

    $scope.ok = function () {
        $uibModalInstance.close();
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

        modalInstance.result.then(function () {
            //Refresh page
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
}]);
