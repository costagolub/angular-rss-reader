'use strict';

// Route configuration
angular.module('rssReaderApp')
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