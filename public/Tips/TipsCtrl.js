var app = angular.module('serveStats');

app.controller('TipsCtrl', function($scope) {
	$scope.dates = ['12/14/1999'];
	$scope.amounts = [22.44];
	$scope.notes = ['No notes here'];
	$scope.total=[];

     console.log($scope.date);

	$scope.addTipData = function() {
		$scope.dates.push($scope.date);
		$scope.amounts.push($scope.amount);
		$scope.notes.push($scope.note);

        $scope.date="";
        $scope.amount="";
        $scope.notes="";
	}
})