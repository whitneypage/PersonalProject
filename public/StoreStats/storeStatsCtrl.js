var app = angular.module('serveStats');

app.controller('storeStatsCtrl', function($scope, mainService) {

	$scope.nums = [1, 2, 3, 4, 5];
    $scope.locationData;
    $scope.avgArr = [];

    $scope.allLocalData = function() {
        mainService.locationData().then(function(data) {
            var salesArr;
            var totalAmount = 0;
            var AvgSales;
            for (var i = 0; i < data.length; i++) {

                var avgObj = {
                    storeName: data[i].storeName.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }),
                    storeNumber: data[i].storeNumber,
                    salesAvg: 0
                }

                salesArr = data[i].sales;

                for (var j = 0; j < salesArr.length; j++) {
                    var amount = salesArr[j].amount;
                    amount = parseFloat(amount);
                    totalAmount += amount;
                }

                AvgSales = totalAmount / salesArr.length;
                avgObj.salesAvg = AvgSales.toFixed(2);
                $scope.avgArr.push(avgObj);
                totalAmount = 0;
            }
            var compareNumbers = function (a, b) {
       			return a.salesAvg - b.salesAvg;
    		}
            $scope.avgArr = $scope.avgArr.sort(compareNumbers).reverse();
            console.log($scope.avgArr);
        })
	

    };

    var compareNumbers = function (a, b) {
       return a - b;
    }
    



    $scope.allLocalData();

}); // ends controller
