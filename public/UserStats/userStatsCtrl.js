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


    var sunWeek = {
        amount: "0",
        date: "",
        _id: "",
    };    
    var monWeek = {
        amount: "0",
        date: "",
        _id: "",
    };  
    var tueWeek = {
        amount: "0",
        date: "",
        _id: "",
    };  

    var wedWeek = {
        amount: "0",
        date: "",
        _id: "",
    }; 
    var thuWeek = {
        amount: "0",
        date: "",
        _id: "",
    }; 
    var friWeek = {
        amount: "0",
        date: "",
        _id: "",
    }; 
    var satWeek = {
        amount: "0",
        date: "",
        _id: "",
    }; 

    var curr = new Date;
    var first = curr.getDate() - curr.getDay();
    var last = first + 6;
    var firstday = new Date(curr.setDate(first - 1));
    var lastday = new Date(curr.setDate(last));
    // 

    $scope.userDatabyWeek = function() {
            mainService.userData().then(function(data) {
                // console.log(data);
                var newSalesArr = data[0].sales;
                // console.log(newSalesArr);
                for (var p = 0; p < newSalesArr.length; p++) {
                    var currDate = new Date(newSalesArr[p].date)
                    currDate = new Date(currDate.getTime() + (currDate.getTimezoneOffset() * 60000));
                    // console.log(p);
                    // console.log(currDate);
                    if (currDate >= firstday && currDate <= lastday) {
                        var dayWeek = currDate.getDay();
                        // console.log(currDate, dayWeek);

                        switch (dayWeek) {
                            case 0:
                                sunWeek = newSalesArr[p]
                                break;
                            case 1:
                                monWeek = newSalesArr[p]
                                break;
                            case 2:
                                tueWeek = newSalesArr[p]
                                break;
                            case 3:
                                wedWeek = newSalesArr[p]
                                break;
                            case 4:
                                thuWeek = newSalesArr[p]
                                break;
                            case 5:
                                friWeek = newSalesArr[p]
                                break;
                            case 6:
                                satWeek = newSalesArr[p]
                                break;
                            default:
                                break;

                        } //ends switch


                    } // ends if 


                }; // ends for loop
                console.log(sunWeek);
                var chart = AmCharts.makeChart("chartdiv", {
                    "type": "serial",
                    "theme": "light",
                    "marginRight": 70,
                    "path": "http://www.amcharts.com/lib/3/",
                    "dataProvider": [{
                        "dayOfWeek": "Sunday",
                        "sales": sunWeek.amount,
                        "color": "#FF0F00"
                    }, {
                        "dayOfWeek": "Monday",
                        "sales": monWeek.amount,
                        "color": "#F8FF01"
                    }, {
                        "dayOfWeek": "Tuesday",
                        "sales": tueWeek.amount,
                        "color": "#B0DE09"
                    }, {
                        "dayOfWeek": "Wednesday",
                        "sales": wedWeek.amount,
                        "color": "#0D8ECF"
                    }, {
                        "dayOfWeek": "Thursday",
                        "sales": thuWeek.amount,
                        "color": "#2A0CD0"
                    }, {
                        "dayOfWeek": "Friday",
                        "sales": friWeek.amount,
                        "color": "#8A0CCF"
                    }, {
                        "dayOfWeek": "Saturday",
                        "sales": satWeek.amount,
                        "color": "#CD0D74"
                    }],
                    "valueAxes": [{
                        "axisAlpha": 0,
                        "position": "left",
                        "title": "Current Week Sales"
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

                });
            })
console.log(satWeek);
        } // ends $scope.userDatabyWeek



    $scope.userDatabyWeek();

    var Jan = {
        firstday: new Date(2014, 11, 31, 23),
        lastday: new Date(2015, 0, 31, 23)
    }
    var Feb = {
        firstday: new Date(2015, 0, 31, 24),
        lastday: new Date(2015, 1, 28, 23)
    }
    var Mar = {
        firstday: new Date(2015, 1, 28, 24),
        lastday: new Date(2015, 2, 31, 23)
    }
    var Apr = {
        firstday: new Date(2015, 2, 31, 24),
        lastday: new Date(2015, 3, 30, 23)
    }
    var May = {
        firstday: new Date(2015, 3, 30, 24),
        lastday: new Date(2015, 4, 30, 23)
    }
    var Jun = {
        firstday: new Date(2015, 4, 30, 24),
        lastday: new Date(2015, 5, 31, 23)
    }
    var Jul = {
        firstday: new Date(2015, 5, 31, 24),
        lastday: new Date(2015, 6, 31, 23)
    }
    var Aug = {
        firstday: new Date(2015, 6, 31, 24),
        lastday: new Date(2015, 7, 31, 23)
    }
    var Sep = {
        firstday: new Date(2015, 7, 31, 24),
        lastday: new Date(2015, 8, 30, 23)
    }
    var Oct = {
        firstday: new Date(2015, 8, 30, 24),
        lastday: new Date(2015, 9, 31, 23)
    }
    var Nov = {
        firstday: new Date(2015, 9, 31, 24),
        lastday: new Date(2015, 10, 30, 23)
    }
    var Dec = {
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


    $scope.userDatabyMonth = function(monthFirst, monthLast) {
        mainService.userData().then(function(data) {
            var allSales = data[0].sales;
            console.log(allSales);
            for (var k = 0; k < allSales.length; k++) {
                var theDate = new Date(allSales[k].date)
                theDate = new Date(theDate.getTime() + (theDate.getTimezoneOffset() * 60000));
                console.log(theDate);
                if (theDate >= monthFirst && theDate <= monthLast) {
                    var dayMonth = theDate.getDay();
                    console.log("dayMonth", dayMonth);
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
        })
    }; // ends $scope.userDatabyMonth



    $scope.userDatabyMonth(May.firstday, May.lastday);


$scope.theAvg;

var getAvg = function(arr) {
    var arrTotal = 0;
    for (var x = 0; x < arr.length; x++) {
        var amount = parseFloat(arr[x]);
        arrTotal += amount;
    }

    var dailyAvg = arrTotal / tuesArr.length;
    $scope.theAvg = dailyAvg.toFixed(2);
    console.log($scope.theAvg)
    arrTotal = 0;
}








});
