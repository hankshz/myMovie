'use strict';

angular.module('myMovieServices', ['ngResource'])
	.factory('Post', function($resource) {
		return $resource('/api/movie/:movieId', {}, {
			query: {
				method: 'GET',
				params: { movieId: '' },
				isArray: true
			}
		});
	})
;



