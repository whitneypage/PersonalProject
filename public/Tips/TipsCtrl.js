var app = angular.module('serveStats');

app.controller('TipsCtrl', function($scope, mainService) {
 
  
	var tipsData = [
		{
			"date": "",
			"amount": ""
		}

	]

	var columnDefs = [
		{ name: 'date'},
		{ name: 'amount'}
	]


    $scope.gridOpts = {
    	columnDefs: columnDefs,
    	data: tipsData
    }
	
    var monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
	];

	$scope.addData = function() {
		var date = new Date($scope.date);
        var month = monthNames[date.getMonth()];
		var day = date.getDate();
		var year = date.getFullYear();
		var newDate = month + " " + day + ", " + year;

		tipsData.push({
			"date": newDate,
			"amount": $scope.amount
		});


        var amount = $scope.amount;

		var tip = {
			date: newDate,
			amount: amount
		}

		mainService.sendTipsData(tip).then(function(data) {
			console.log(data);
			$scope.date= "";
		    $scope.amount= "";
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

				tipObj.date = data[i].tipDate;
				tipObj.amount = data[i].tipAmount;
				tipsData.unshift(tipObj);

			};
			
		})
	}

	$scope.getTipsData();
});