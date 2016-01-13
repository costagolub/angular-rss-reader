'use strict';

// Init an Angular with its dependencies
require('angular');
require('angular-sanitize');
require('angular-route');
require('ngstorage');

// Init an App
angular.module('rssReaderApp', [
	'ngSanitize', 
	'ngRoute',
  'ngStorage'
])

// Route configuration
.config(['$routeProvider', '$locationProvider',
  function($routeProvider) {
    $routeProvider
      .when('/feedList', {
        templateUrl: 'views/feedList.html'
      })
      .when('/feedPost', {
        templateUrl: 'views/feedPost.html'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

// Controllers
require('./controllers');
// Services
require('./services');
// Directives
require('./directives');



