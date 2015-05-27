var app = angular.module('serveStats');

app.controller('userStatsCtrl', function($scope, mainService) {

    $scope.locationData;
    $scope.avgArr = [];
    

    var compareNumbers = function(a, b) {
        return a - b;
    }

    $scope.userDatabyLoc = function() {
        mainService.userDatabyLoc().then(function(data) {
            var salesArr;
            var totalAmount = 0;
            var AvgSales;
            for (var i = 0; i < data.length; i++) {

                var avgObj = {
                    firstName: data[i].firstName.replace(/(?:^|\s)\S/g, function(a) {
                        return a.toUpperCase();
                    }),
                    lastName: data[i].lastName.replace(/(?:^|\s)\S/g, function(a) {
                        return a.toUpperCase();
                    }),
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
            var compareNumbers = function(a, b) {
                return a.salesAvg - b.salesAvg;
            }
            $scope.avgArr = $scope.avgArr.sort(compareNumbers).reverse();
            console.log($scope.avgArr);
        })


    };


    $scope.userDatabyLoc();

    $scope.userData = function() {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        console.log(firstDay);
        console.log(lastDay);
        mainService.getUserData().then(function(data) {
            console.log("userData", data);
        })
    }



    $scope.userData();

}); 