'use strict';

module.exports = function($q, $rootScope) {
	return {
		parse : function(url) {
			var d = $q.defer();
			var feed = new google.feeds.Feed(url);
			feed.setNumEntries(8);
			feed.load(function(result) {
				$rootScope.$apply(d.resolve(result));
			});
			return d.promise;
		}
	};
};