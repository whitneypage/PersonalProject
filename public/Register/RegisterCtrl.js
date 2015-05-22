var app = angular.module('serveStats');

app.controller('RegisterCtrl', function($scope, mainService, $location) {



    $scope.loginUser = function() {
        console.log('fired', $scope.loginEmail, $scope.loginPassword)
        mainService.loginUser($scope.loginEmail, $scope.loginPassword).then(function(response) {
            if (response) $location.path('/dashboard');
        }).catch(function(err) {
            console.log(err);
        });
    };






}); //ends controller
