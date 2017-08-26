'use strict';

angular.module('myMovieServices', ['ngResource'])
    .factory('Movie', function($resource) {
        return $resource('/api/movie/:movieId', {}, {
            query: {
                method: 'GET',
                params: { movieId: '' },
                isArray: true
            }
        });
    })
;

angular.module('myMovieServices', ['ngResource'])
    .factory('Task', function($resource) {
        return $resource('/api/task/:taskId', {}, {
            query: {
                method: 'GET',
                params: { taskId: '' },
                isArray: true
            }
        });
    })
;



