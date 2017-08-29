'use strict';

angular.module('myMovieServices', ['ngResource']);

angular.module('myMovieServices').factory('Movie', function($resource) {
        return $resource('/api/movie/:movieId', {}, {
            query: {
                method: 'GET',
                params: { movieId: '' },
                isArray: true
            }
        });
    })
;

angular.module('myMovieServices').factory('Task', function($resource) {
        return $resource('/api/task/:taskId', {}, {
            query: {
                method: 'GET',
                params: { taskId: '' },
                isArray: true
            }
        });
    })
;

angular.module('myMovieServices').factory('Download', function($resource) {
        return $resource('/api/download/:downloadId', {}, {
            query: {
                method: 'GET',
                params: { downloadId: '' },
                isArray: true
            }
        });
    })
;
