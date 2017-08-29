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

angular.module('myMovieControllers').controller('CreateController', ['$scope', '$uibModalInstance', 'FileUploader', 'Task', function($scope, $uibModalInstance, FileUploader, Task){
    $scope.tasks = {}
    var uploader = $scope.uploader = new FileUploader({
            url: 'fileUpload'
        });

        // FILTERS

        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                //console.log('syncFilter');
                return this.queue.length < 10;
            }
        });

        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
                //console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            //console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            //console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            //console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            //console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            //console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            //console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            $scope.tasks[fileItem.$$hashKey] = response;
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            //console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            //console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            //console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            //console.info('onCompleteAll');
        };

        uploader.removeItem = function(fileItem) {
            fileItem.remove();
            delete $scope.tasks[fileItem.$$hashKey];
        }

        uploader.removeAll = function() {
            uploader.clearQueue();
            $scope.tasks={};
        }

        //console.info('uploader', uploader);

    $scope.start = function () {
        for (var key in $scope.tasks){
            var task = new Task();
            task.uploadedFileId = $scope.tasks[key]['id'];
            task.$save(function() {
                //console.log('task saved');
            });
        }
        $uibModalInstance.close();
    };
}]);

angular.module('myMovieControllers').controller('DownloadController', ['$scope', '$timeout', '$uibModal', 'Task', 'Download', function ($scope, $timeout, $uibModal, Task, Download) {
    $scope.unitConvert = function (num, digits) {
        num = Number(num);
        var si = [
            { value: 1E18, symbol: "E" },
            { value: 1E15, symbol: "P" },
            { value: 1E12, symbol: "T" },
            { value: 1E9,  symbol: "G" },
            { value: 1E6,  symbol: "M" },
            { value: 1E3,  symbol: "k" }
        ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
        for (i = 0; i < si.length; i++) {
            if (num >= si[i].value) {
              return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
            }
        }
        return num.toFixed(digits).replace(rx, "$1");
    };
    $scope.gridsterOpts = {
        margins: [20, 20],
        outerMargin: false,
        pushing: true,
        floating: true,
        draggable: {
            enabled: true
        },
        resizable: {
            enabled: false,
            handles: ['n', 'e', 's', 'w', 'se', 'sw']
        }
    };
    $scope.refresh = 5000;
    $scope.downloads = {};
    $scope.downloadQuery = function() {
        Download.get({}, function(downloads) {
            for (var key in downloads.objects) {
                if (key in $scope.downloads) {
                    // TODO: optimize the copy
                    $scope.downloads[key].status = downloads.objects[key].status;
                    $scope.downloads[key].downloadSpeed = downloads.objects[key].downloadSpeed;
                    $scope.downloads[key].completedLength = downloads.objects[key].completedLength;
                    $scope.downloads[key].totalLength = downloads.objects[key].totalLength;
                    $scope.downloads[key].files = downloads.objects[key].files;
                } else {
                    $scope.downloads[key] = downloads.objects[key];
                }
            }
        });
    }
    $scope.downloadQuery();
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
            $scope.downloadQuery();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    $scope.onTimeout = function() {
        $scope.downloadQuery();
        //console.log('Periodic refreshing!');
        $scope.mytimeout = $timeout($scope.onTimeout, $scope.refresh);
    };
    $scope.mytimeout = $timeout($scope.onTimeout, $scope.refresh);
    $scope.$on('$locationChangeStart', function() {
         $timeout.cancel($scope.mytimeout);
    });
}]);
