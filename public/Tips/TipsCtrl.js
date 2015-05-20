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

		tipsData.unshift({
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

		
	};

});