'use strict';

var httpPrefix = require('./_httpPrefix.js');
var diagram = require('./_diagram.js');

angular.module('rssReaderApp')
.directive('httpPrefix', httpPrefix)
.directive('pieDiagram', diagram);