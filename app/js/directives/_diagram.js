'use strict';

module.exports = function() {
	return {
		restrict: 'EA',
		scope: {
			data: '=pieData',
			width: '@pieWidth',
			height: '@pieHeight',
			title: '@pieTitle'
		},
		link: function($scope, $elm, $attr) {
			if (!$scope.data) {
				return;
			}
			var fakeDiv = document.createElement('div');
			fakeDiv.innerHTML = $scope.data;
			var text = fakeDiv.textContent || fakeDiv.innerText || '';
			// remove all non-latin-alpabetic characters
			var onlyLatin = text.replace(/\W+\d*/g, '').toLowerCase().split('');
			var characters = [];

			if (!onlyLatin.length) {
				$elm[0].style.display = 'none';
				
				return;
			}

			var charObj = onlyLatin.reduce(function(chars, letter) {
				if (chars.hasOwnProperty(letter)) {
					chars[letter]++;
				} else {
					chars[letter] = 1;
				}
				return chars;
			}, {});

			for (var key in charObj) {
				characters.push([key, charObj[key]]);
			}

			var options = {
				'title': $scope.title,
        'width': $scope.width,
        'height': $scope.height
      };

			var data = new google.visualization.DataTable();
      data.addColumn('string', 'Label');
      data.addColumn('number', 'Value');
      data.addRows(characters);

      var chart = new google.visualization.PieChart($elm[0]);
      chart.draw(data, options);
		}
	};
};