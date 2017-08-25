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



