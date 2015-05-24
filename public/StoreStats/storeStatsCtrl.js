var app = angular.module('serveStats');

app.controller('storeStatsCtrl', function($scope, mainService) {

$scope.locationData;


    $scope.allLocalData = function() {
        mainService.locationData().then(function(data) {
            console.log(data);
            $scope.locationData = data;
        })
    }

$scope.allLocalData();



});
