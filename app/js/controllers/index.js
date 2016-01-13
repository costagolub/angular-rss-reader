'use strict';

var mainCtrl = require('./_mainCtrl.js');

angular.module('rssReaderApp')
.controller('mainCtrl', ['$scope', '$log', 'LoadFeed', '$sce', '$timeout', '$localStorage', mainCtrl]);