'use strict';
 
module.exports = function($scope, $log, LoadFeed, $sce, $timeout, $localStorage) {
  $scope.feedDisabled = true;
  $scope.activeFeed = null;
  $scope.loader = false;

  $scope.$storage = $localStorage;

  // Model: the feed list
  $scope.feedList = [
  	'http://feeds.feedburner.com/TechCrunch/startups',
		'http://feeds.bbci.co.uk/news/rss.xml',
		'http://habrahabr.ru/rss/feed/posts/4dee03362dfd234cb33c665c4a107e00/',
		'http://www.fifa.com/worldcup/qatar2022/news/rss.xml'
	];


	// Set the localStorage
	if (typeof $scope.$storage.feedList !== 'undefined') {
		$scope.feedList = $scope.$storage.feedList;
	} else {
		$scope.$storage.feedList = $scope.feedList;
	}


	// Add Feed to the feed list
	$scope.addFeed = function() {
		var url = $scope.newFeed;
		$scope.newFeed = '';
		
		LoadFeed.parse(url).then(function(data) {
			if (data.error) {
				$scope.errorName = data.error.message + 'The code of error is ' + data.error.code;
				console.log('Error ', data.error);
			} else {
				$scope.errorName = '';
				$scope.feedList.push(url);
			}
		});	
	};

	// Get unique authors of the feed list
	$scope.getAuthors = function(data) {
		var uniqueAuthors = data.reduce(function(authors, line) {
			if (authors.indexOf(line.author) < 0 && line.author.length > 0) {
				authors.push(line.author);
			}

			return authors;
		}, []);

	  return uniqueAuthors;
	};

	// Remove the feed from the list
	$scope.removeFeed = function(feed) {
		var that = this;
		$scope.feedList.splice(that.$index, 1);

		if ($scope.activeFeed === feed) {
			$scope.activeFeed = $scope.feedData = $scope.postData = null;
		}
	};

	// Choose the feed
	$scope.choosedFeed = function(feed) {
		var that = this,
				current = $scope.feedList[that.$index];

		$scope.activeFeed = feed;
		$scope.loader = true;

		LoadFeed.parse(current).then(function(data) {
			$scope.feedData = data.feed;
			$scope.authors = $scope.getAuthors(data.feed.entries);

			// Add some latency 
			$timeout(function() {
				$scope.loader = false;
			}, 600);
				
			console.log('Load data ', data);
		});	
	};

	// Choose the post
	$scope.choosedPost = function(index) {
		$scope.postData = $scope.feedData.entries[index];
		$scope.snippet = $scope.postData.content;
	  $scope.asHtml = $sce.trustAsHtml($scope.snippet);
	};
};
