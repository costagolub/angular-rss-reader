'use strict';

var loadFeed = require('./_loadFeed.js');

angular.module('rssReaderApp')
.factory('LoadFeed', ['$q', '$rootScope', loadFeed]);