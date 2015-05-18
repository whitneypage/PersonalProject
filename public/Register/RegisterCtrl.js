var app = angular.module('serveStats');

app.controller('RegisterCtrl', function($scope, mainService, $location) {

    $scope.createUser = function() {
        var newUser = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            password: $scope.password
        }
        mainService.createUser(newUser).then(function(data) {
            console.log(data);
            $location.path('/');
        });
    }

     $scope.loginUser = function() {
        console.log('fired', $scope.loginEmail, $scope.loginPassword)
        mainService.loginUser($scope.loginEmail, $scope.loginPassword).then(function() {
            $location.path('/dashboard');
        }).catch(function(err) {
            // $scope.loginError = true;
            console.log(err);
        });
    };

   




}); //ends controller
