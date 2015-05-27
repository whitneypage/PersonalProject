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

    var weekArr = [];
    var sunWeek;
    var monWeek;
    var tueWeek;
    var wedWeek;
    var thuWeek;
    var friWeek;
    var satWeek;

    var curr = new Date;
    var first = curr.getDate() - curr.getDay();
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    console.log("days", firstday, lastday);

    $scope.userDatabyWeek = function() {

        mainService.userDatabyWeek().then(function(data) {
            var newSalesArr = data[0].sales;
            console.log(newSalesArr);
            for (var p = 0; p < newSalesArr.length; p++) {
                var currDate = new Date(newSalesArr[p].date)
                if ( currDate > firstday && currDate < lastday) {
                    weekArr.push(newSalesArr[p]);
                    

                }
                console.log("weekArr", weekArr);
            };
        })
    }



    $scope.userDatabyWeek();

});
