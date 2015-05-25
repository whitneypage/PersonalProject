var app = angular.module('serveStats');

app.controller('TipsCtrl', function($scope, mainService) {
 
 $scope.tipsList = [];

    var monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
	];

	$scope.addTipData = function() {
		 var amount = $scope.tipAmount;

		  console.log($scope.date);
          console.log($scope.tipAmount);

		var date = new Date($scope.date);
        var month = monthNames[date.getMonth()];
		var day = date.getDate();
		var year = date.getFullYear();
		var newDate = month + " " + day + ", " + year;
		console.log(newDate);

		$scope.tipsList.unshift({
			date: newDate,
			amount: amount
		});

		var tip = {
			date: newDate,
			amount: amount
		}

		mainService.sendTipsData(tip).then(function(data) {
			console.log(data);
			$scope.date= "";
		    $scope.tipAmount= "";
		});

		
	}; //ends addData function


	$scope.getTipsData = function() {
		mainService.getTipsData().then(function(data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				var tipObj = {
					"date": "",
					"amount": ""
				}

				tipObj.date = data[i].date;
				tipObj.amount = data[i].tipAmount;
				$scope.tipsList.unshift(tipObj);

			};
			
		})
	}

	$scope.getTipsData();
});