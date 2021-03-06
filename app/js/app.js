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

// Routes
require('./routes');
// Controllers
require('./controllers');
// Services
require('./services');
// Directives
require('./directives');



