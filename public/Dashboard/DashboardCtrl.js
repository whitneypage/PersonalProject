var app = angular.module('serveStats');

app.controller('DashboardCtrl', function($scope, mainService) {
  $scope.userName;

  $scope.getName = function() {
  	mainService.getUserName().then(function(data) {
  		$scope.userName = data;
  	})
  }
});