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
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $('#login-form-link').addClass('active');
            console.log(data);
        });
    }

     $scope.loginUser = function() {
        console.log('fired', $scope.loginEmail, $scope.loginPassword)
        mainService.loginUser($scope.loginEmail, $scope.loginPassword).then(function(response) {
           if(response) $location.path('/dashboard');
        }).catch(function(err) {
            console.log(err);
        });
    };

   




}); //ends controller
