var app = angular.module('serveStats');

app.controller('storeLoginCtrl', function($scope, mainService, $location) {


    $scope.createStore = function() {

        var newStore = {
            storeName: $scope.storeName,
            storeNumber: $scope.storeNumber,
            ownerName: $scope.ownerName,
            storeEmail: $scope.storeEmail,
            storePassword: $scope.storePassword
        }
        mainService.createStore(newStore).then(function(data) {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $('#login-form-link').addClass('active');
            console.log(data);
        });
    }


    $scope.loginStore = function() {
        console.log('fired', $scope.loginStoreEmail, $scope.loginStorePassword)
        mainService.loginStore($scope.loginStoreEmail, $scope.loginStorePassword).then(function(response) {
            if (response) $location.path('/storeDashboard');
        }).catch(function(err) {
            console.log(err);
        });
    };

    if ($scope.storePassword !== $scope.password) {
        $scope.error = "Passwords do not match"

    } else {
        var finalPassword = $scope.storePassword
    }



});
