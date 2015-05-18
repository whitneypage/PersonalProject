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
	// $scope.dates = ['12/14/1999'];
	// $scope.amounts = [22.44];
	// $scope.notes = ['No notes here'];
	// $scope.total=[];
    var monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
	];

	$scope.addData = function() {

		console.log($scope.date);
		var date = new Date($scope.date);
        var month = monthNames[date.getMonth()];
		var day = date.getDate();
		var year = date.getFullYear();
		var newDate = month + " " + day + ", " + year;

		$scope.gridOpts.data.unshift({
			"date": newDate,
			"amount": $scope.amount
		});

		$scope.date= "";
		$scope.amount= "";

		var tipsData = {
			tipDate: newDate,
			Amount: $scope.Amount
		}

		mainService.sendTipsData(tipsData).then(function(data) {
			console.log(data);
		});
	};

});