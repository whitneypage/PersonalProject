var app = angular.module('serveStats');

app.controller('storeStatsCtrl', function($scope, mainService) {

$scope.locationData;
$scope.avgArr = [];

    $scope.allLocalData = function() {
        mainService.locationData().then(function(data) {
			var salesArr;
			var totalAmount = 0;
			var AvgSales;
			for (var i = 0; i < data.length; i++) {

				var avgObj = {
        			storeName: data[i].storeName.replace(/\b./g, function(m){ return m.toUpperCase(); }),
        			storeNumber: data[i].storeNumber,
        			salesAvg: 0
        		}
    			

				salesArr = data[i].sales;
				console.log(salesArr);

				for (var i = 0; i < salesArr.length; i++) {
            		var amount = salesArr[i].amount;
            		amount  = parseFloat(amount);
            		totalAmount += amount;
            	}
            	AvgSales = totalAmount/salesArr.length;

                avgObj.salesAvg = AvgSales.toFixed(2);
            	$scope.avgArr.push(avgObj);
            }
		})
           
    };





    $scope.allLocalData();

}); // ends controller 
