var app = angular.module('serveStats');

app.controller('ServerStatsCtrl', function($scope, mainService) {

    $scope.locationData;
    $scope.avgArr = [];

    var compareNumbers = function(a, b) {
        return a - b;
    }

    $scope.userDatabyLoc = function() {
        mainService.userDatabyLoc().then(function(data) {
            console.log("ServerStats", data)
            var salesArr;
            var totalAmount = 0;
            var AvgSales;
            for (var i = 0; i < data.length; i++) {

                var avgObj = {
                    id: data[i]._id,

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
            console.log("avgArr", $scope.avgArr);
        })


    };

    $scope.userDatabyLoc();


    $scope.firstName;
    $scope.lastName;


    $scope.doSelect = function(firstName, lastName) {
        $scope.firstName = firstName,
        $scope.lastName = lastName
        console.log($scope.firstName);
    }



    var getAvg = function(arr) {
        var arrTotal = 0;
        for (var x = 0; x < arr.length; x++) {
            var amount = parseFloat(arr[x]);
            arrTotal += amount;
        }

        var dailyAvg = arrTotal / arr.length;
        var theAvg = dailyAvg.toFixed(2);

        return theAvg;
        arrTotal = 0;
    }


    $scope.Jan = {
        firstday: new Date(2014, 11, 31, 23),
        lastday: new Date(2015, 0, 31, 23)
    }
    $scope.Feb = {
        firstday: new Date(2015, 0, 31, 24),
        lastday: new Date(2015, 1, 28, 23)
    }
    $scope.Mar = {
        firstday: new Date(2015, 1, 28, 24),
        lastday: new Date(2015, 2, 31, 23)
    }
    $scope.Apr = {
        firstday: new Date(2015, 2, 31, 24),
        lastday: new Date(2015, 3, 30, 23)
    }
    $scope.May = {
        firstday: new Date(2015, 3, 30, 24),
        lastday: new Date(2015, 4, 30, 23)
    }
    $scope.Jun = {
        firstday: new Date(2015, 4, 30, 24),
        lastday: new Date(2015, 5, 31, 23)
    }
    $scope.Jul = {
        firstday: new Date(2015, 5, 31, 24),
        lastday: new Date(2015, 6, 31, 23)
    }
    $scope.Aug = {
        firstday: new Date(2015, 6, 31, 24),
        lastday: new Date(2015, 7, 31, 23)
    }
    $scope.Sep = {
        firstday: new Date(2015, 7, 31, 24),
        lastday: new Date(2015, 8, 30, 23)
    }
    $scope.Oct = {
        firstday: new Date(2015, 8, 30, 24),
        lastday: new Date(2015, 9, 31, 23)
    }
    $scope.Nov = {
        firstday: new Date(2015, 9, 31, 24),
        lastday: new Date(2015, 10, 30, 23)
    }
    $scope.Dec = {
        firstday: new Date(2015, 10, 30, 24),
        lastday: new Date(2015, 11, 31, 23)
    }


    var sunArr = [];
    var monArr = [];
    var tueArr = [];
    var wedArr = [];
    var thuArr = [];
    var friArr = [];
    var satArr = [];

    var sunAvg = 0;
    var monAvg = 0;
    var tueAvg = 0;
    var wedAvg = 0;
    var thuAvg = 0;
    var friAvg = 0;
    var satAvg = 0;


    $scope.userDatabyMonth = function(monthFirst, monthLast) {
        mainService.userDatabyLoc().then(function(data) {
            console.log("Start of return from service", data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].firstName === $scope.firstName && data[i].lastName === $scope.lastName) {
                    var allSales = data[i].sales;
                    for (var k = 0; k < allSales.length; k++) {
                        var theDate = new Date(allSales[k].date)
                        theDate = new Date(theDate.getTime() + (theDate.getTimezoneOffset() * 60000));
                        if (theDate >= monthFirst && theDate <= monthLast) {
                            var dayMonth = theDate.getDay();
                            switch (dayMonth) {
                                case 0:
                                    sunArr.push(allSales[k].amount)
                                    break;
                                case 1:
                                    monArr.push(allSales[k].amount)
                                    break;
                                case 2:
                                    tueArr.push(allSales[k].amount)
                                    break;
                                case 3:
                                    wedArr.push(allSales[k].amount)
                                    break;
                                case 4:
                                    thuArr.push(allSales[k].amount)
                                    break;
                                case 5:
                                    friArr.push(allSales[k].amount)
                                    break;
                                case 6:
                                    satArr.push(allSales[k].amount)
                                    break;
                                default:
                                    break;

                            } //ends switch
                        } //ends if

                    }; //ends for
                }
            }
            console.log("thuArr", thuArr);
            var sunAvg = getAvg(sunArr);
            var monAvg = getAvg(monArr);
            var tueAvg = getAvg(tueArr);
            var wedAvg = getAvg(wedArr);
            var thuAvg = getAvg(thuArr);
            var friAvg = getAvg(friArr);
            var satAvg = getAvg(satArr);
            console.log("ThuAvg", thuAvg);


            var chart2 = AmCharts.makeChart("chartdiv2", {
                "type": "serial",
                "theme": "dark",
                "marginRight": 70,
                "path": "http://www.amcharts.com/lib/3/",
                "dataProvider": [{
                    "dayOfWeek": "Sunday",
                    "sales": sunAvg,
                    "color": "#FF0F00"
                }, {
                    "dayOfWeek": "Monday",
                    "sales": monAvg,
                    "color": "#F8FF01"
                }, {
                    "dayOfWeek": "Tuesday",
                    "sales": tueAvg,
                    "color": "#B0DE09"
                }, {
                    "dayOfWeek": "Wednesday",
                    "sales": wedAvg,
                    "color": "#0D8ECF"
                }, {
                    "dayOfWeek": "Thursday",
                    "sales": thuAvg,
                    "color": "#2A0CD0"
                }, {
                    "dayOfWeek": "Friday",
                    "sales": friAvg,
                    "color": "#8A0CCF"
                }, {
                    "dayOfWeek": "Saturday",
                    "sales": satAvg,
                    "color": "#CD0D74"
                }],
                "valueAxes": [{
                    "axisAlpha": 0,
                    "position": "left",
                    "title": "Monthly Daily Sales Average"
                }],
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "<b>[[category]]: [[value]]</b>",
                    "fillColorsField": "color",
                    "fillAlphas": 0.9,
                    "lineAlpha": 0.2,
                    "type": "column",
                    "valueField": "sales"
                }],
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "dayOfWeek",
                "categoryAxis": {
                    "gridPosition": "start",
                    "labelRotation": 45
                },
                "export": {
                    "enabled": true
                }

            }); //ends chart

        });
        // 

        var sunArr = [];
        var monArr = [];
        var tueArr = [];
        var wedArr = [];
        var thuArr = [];
        var friArr = [];
        var satArr = [];

    }; // ends $scope.userDatabyMonth








}); // ends controller
