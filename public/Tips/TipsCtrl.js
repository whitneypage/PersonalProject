var app = angular.module('serveStats');

app.controller('TipsCtrl', function($scope, mainService) {

    $scope.tipsList = [];

    $scope.date = "";

    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    $scope.addTipData = function() {
        var amount = $scope.tipAmount;

        console.log($scope.date);
        console.log($scope.tipAmount);

        var date = new Date($scope.date);
        var month = monthNames[date.getMonth()];
        var day = date.getDate();
        var dayofWeek = days[date.getDay()];
        var year = date.getFullYear();
        var newDate = dayofWeek + " // " + month + " " + day + ", " + year;
        console.log(newDate);

        $scope.tipsList.unshift({
            date: newDate,
            amount: amount
        });

        var tip = {
            date: newDate,
            amount: amount
        }

        mainService.sendTipsData(tip).then(function(data) {
            $scope.date = "";
            $scope.tipAmount = "";
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
                var date = new Date(data[i].tipDate);
                var month = monthNames[date.getMonth()];
                var day = date.getDate();
                var year = date.getFullYear();
                var dayofWeek = days[date.getDay()];
                var newDate = dayofWeek + " // " + month + " " + day + ", " + year;

                tipObj.date = newDate;
                tipObj.amount = data[i].tipAmount;
                $scope.tipsList.unshift(tipObj);

            };

        })
    }

    $scope.getTipsData();

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
                        "theme": "patterns",
                        "marginRight": 70,
                        "path": "http://www.amcharts.com/lib/3/",
                        "dataProvider": [{
                            "dayOfWeek": "Sunday",
                            "tips": sunTip,
                            "color": "#FF0F00",
                            "pattern": {
                                "url": "http://www.amcharts.com/lib/3/patterns/white/pattern2.png",
                                "width": 4,
                                "height": 4
                            }
                        }, {
                            "dayOfWeek": "Monday",
                            "tips": monTip,
                            "color": "#F8FF01",
                            "pattern": {
                                "url": "http://www.amcharts.com/lib/3/patterns/white/pattern2.png",
                                "width": 4,
                                "height": 4
                            }
                        }, {
                            "dayOfWeek": "Tuesday",
                            "tips": tueTip,
                            "color": "#B0DE09",
                             "pattern": {
                                "url": "http://www.amcharts.com/lib/3/patterns/white/pattern2.png",
                                "width": 4,
                                "height": 4
                            }
                        }, {
                            "dayOfWeek": "Wednesday",
                            "tips": wedTip,
                            "color": "#0D8ECF",
                             "pattern": {
                                "url": "http://www.amcharts.com/lib/3/patterns/white/pattern2.png",
                                "width": 4,
                                "height": 4
                            }
                        }, {
                            "dayOfWeek": "Thursday",
                            "tips": thuTip,
                            "color": "#2A0CD0",
                             "pattern": {
                                "url": "http://www.amcharts.com/lib/3/patterns/white/pattern2.png",
                                "width": 4,
                                "height": 4
                            }

                        }, {
                            "dayOfWeek": "Friday",
                            "tips": friTip,
                            "color": "#8A0CCF",
                             "pattern": {
                                "url": "http://www.amcharts.com/lib/3/patterns/white/pattern2.png",
                                "width": 4,
                                "height": 4
                            }
                        }, {
                            "dayOfWeek": "Saturday",
                            "tips": satTip,
                            "color": "#ffffff",
                             "pattern": {
                                "url": "http://www.amcharts.com/lib/3/patterns/white/pattern2.png",
                                "width": 4,
                                "height": 4
                            }

                        }],
                        "valueAxes": [{
                            "axisAlpha": 0,
                            "position": "left",
                        }],
                        "startDuration": 1,
                        "startEffect": "easeInSine",
                        "color": "#ffffff",
                        "graphs": [{
                            "balloonText": "<b>[[category]]: [[value]]</b>",
                            "fillColorsField": "color",
                            "fillAlphas": 0.9,
                            "lineAlpha": 0.2,
                            "type": "column",
                            "valueField": "tips",
                            "patternField": "pattern"
                        }],
                        "chartCursor": {
                            "categoryBalloonEnabled": false,
                            "cursorAlpha": 0,
                            "zoomable": false
                        },
                        "categoryField": "dayOfWeek",
                        "fontSize": 12,
                        "categoryAxis": {
                            "axisColor": "#ffffff",
                            "gridColor": "#ffffff",
                            "gridThickness": 3,
                            "gridPosition": "start",
                            "labelRotation": 45
                        },
                        "export": {
                            "enabled": true,
                            "libs": {
                                "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
                            }
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
