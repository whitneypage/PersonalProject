var app = angular.module('serveStats');

app.controller('TipsCtrl', function($scope, mainService) {
 
 $scope.tipsList = [];

 $scope.date = "";

    var monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
	];
	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

	$scope.addTipData = function() {
		 var amount = $scope.tipAmount;

		  console.log($scope.date);
          console.log($scope.tipAmount);

		var date = new Date($scope.date);
        var month = monthNames[date.getMonth()];
		var day = date.getDate();
		var dayofWeek = days[date.getDay()];
		var year = date.getFullYear();
		var newDate = dayofWeek + " // " +month + " " + day + ", " + year;
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
				var date = new Date(data[i].tipDate);
       			var month = monthNames[date.getMonth()];
				var day = date.getDate();
				var year = date.getFullYear();
				var dayofWeek = days[date.getDay()];
				var newDate = dayofWeek + " // " + month + " " + day + ", " + year;

				tipObj.date = newDate;
				tipObj.amount = data[i].tipAmount;
				$scope.tipsList.unshift(tipObj);

			};
			
		})
	}

	$scope.getTipsData();
});