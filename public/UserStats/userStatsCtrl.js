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
                        "title": "This Weeks Sales"
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

        } // ends $scope.userDatabyWeek



    $scope.userDatabyWeek();

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

    console.log($scope.Dec.firstday, $scope.Dec.lastday);

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
        console.log("dates", monthFirst, monthLast);
        console.log("Start of User Data by Month");
        mainService.userData().then(function(data) {
                var allSales = data[0].sales;
                console.log("Start of return from service");
                for (var k = 0; k < allSales.length; k++) {
                    var theDate = new Date(allSales[k].date)
                    theDate = new Date(theDate.getTime() + (theDate.getTimezoneOffset() * 60000));
                    if (theDate >= monthFirst && theDate <= monthLast) {
                        var dayMonth = theDate.getDay();
                        console.log("if")
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

                });

            })
            // 

        var sunArr = [];
        var monArr = [];
        var tueArr = [];
        var wedArr = [];
        var thuArr = [];
        var friArr = [];
        var satArr = [];

    }; // ends $scope.userDatabyMonth



    $scope.userDatabyMonth($scope.May.firstday, $scope.May.lastday);

    var sArr = [];
    var mArr = [];
    var tArr = [];
    var wArr = [];
    var thArr = [];
    var fArr = [];
    var saArr = [];

    var sunTip = 0;
    var monTip = 0;
    var tueTip = 0;
    var wedTip = 0;
    var thuTip = 0;
    var friTip = 0;
    var satTip = 0;


    $scope.tipDataChart = function() {
            mainService.getTipsData().then(function(data) {
                    console.log("getTipsData", data);
                    for (var c = 0; c < data.length; c++) {
                        var currDate = new Date(data[c].tipDate)
                        currDate = new Date(currDate.getTime() + (currDate.getTimezoneOffset() * 60000));
                        currDate = currDate.getDay();

                        switch (currDate) {
                            case 0:
                                sArr.push(data[c].tipAmount)
                                break;
                            case 1:
                                mArr.push(data[c].tipAmount)
                                break;
                            case 2:
                                tArr.push(data[c].tipAmount)
                                break;
                            case 3:
                                wArr.push(data[c].tipAmount)
                                break;
                            case 4:
                                thArr.push(data[c].tipAmount)
                                break;
                            case 5:
                                fArr.push(data[c].tipAmount)
                                break;
                            case 6:
                                saArr.push(data[c].tipAmount)
                                break;
                            default:
                                break;

                        } //ends switch



                    } // ends for 

                    console.log("thArr", thArr);
                    var sunTip = getAvg(sArr);
                    var monTip = getAvg(mArr);
                    var tueTip = getAvg(tArr);
                    var wedTip = getAvg(wArr);
                    var thuTip = getAvg(thArr);
                    var friTip = getAvg(fArr);
                    var satTip = getAvg(saArr);
                    console.log("ThuAvg", thuTip);

                    var chart3 = AmCharts.makeChart("chartdiv3", {
                        "type": "serial",
                        "theme": "chalk",
                        "marginRight": 70,
                        "path": "http://www.amcharts.com/lib/3/",
                        "dataProvider": [{
                            "dayOfWeek": "Sunday",
                            "tips": sunTip,
                            "color": "#FF0F00"
                        }, {
                            "dayOfWeek": "Monday",
                            "tips": monTip,
                            "color": "#F8FF01"
                        }, {
                            "dayOfWeek": "Tuesday",
                            "tips": tueTip,
                            "color": "#B0DE09"
                        }, {
                            "dayOfWeek": "Wednesday",
                            "tips": wedTip,
                            "color": "#0D8ECF"
                        }, {
                            "dayOfWeek": "Thursday",
                            "tips": thuTip,
                            "color": "#2A0CD0"
                        }, {
                            "dayOfWeek": "Friday",
                            "tips": friTip,
                            "color": "#8A0CCF"
                        }, {
                            "dayOfWeek": "Saturday",
                            "tips": satTip,
                            "color": "#CD0D74"
                        }],
                        "valueAxes": [{
                            "axisAlpha": 0,
                            "position": "left",
                            "title": "Daily Tip Average"
                        }],
                        "startDuration": 1,
                        "graphs": [{
                            "balloonText": "<b>[[category]]: [[value]]</b>",
                            "fillColorsField": "color",
                            "fillAlphas": 0.9,
                            "lineAlpha": 0.2,
                            "type": "column",
                            "valueField": "tips"
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


                }) // ends Main Service

            var sArr = [];
            var mArr = [];
            var tArr = [];
            var wArr = [];
            var thArr = [];
            var fArr = [];
            var saArr = [];
        } // ends tipsDataChart

    $scope.tipDataChart();






});
