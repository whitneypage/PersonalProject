var app = angular.module('serveStats');


app.service('mainService', function($http, $q) {

    this.userId;
    this.userName;

    this.createUser = function(newUser) {
        console.log('ms-newuser', newUser)
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/register',
            data: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                password: newUser.password
            }
        }).then(function(response) {
            console.log(response);
            deferred.resolve(response.data)
        });
        return deferred.promise;
    };


    this.loginUser = function(email, password) {
        console.log('emailpass', email, password)
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/auth',
            data: {
                username: email,
                password: password
            }
        }).then(function(response) {
            this.userId = response.data._id;
            this.userName = response.data.firstName;
            console.log("USER ID", this.userId, this.userName);
            deferred.resolve(response.data);
        }).catch(function(err) {
            console.log('error logging in');
            deferred.reject(err);
        })
        return deferred.promise;
    };

    this.sendTipsData = function(tipsData) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/tips/' + userId,
            data: {
                tipDate: tipsData.date,
                tipAmount: tipsData.amount
            }
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    };



    this.getUserName = function() {
        return this.userName;
    }

    this.getTipsData = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/tips/' + userId
        }).then(function(response) {
        	deferred.resolve(response.data.tips)
        });
        return deferred.promise;
    }


// Store Login

    this.createStore = function(newStore) {
        console.log('ms-newStore', newStore)
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/register/location',
            data: {
               	storeName: newStore.storeName,
            	storeNumber: newStore.storeNumber,
            	ownerName: newStore.ownerName,
            	storeEmail: newStore.storeEmail,
            	password: newStore.storePassword
            }
        }).then(function(response) {
            console.log(response.data);
            deferred.resolve(response.data)
        });
        return deferred.promise;
    };


    this.loginStore = function(email, password) {
        console.log('emailpass', email, password)
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/auth/location',
            data: {
                username: email,
                password: password
            }
        }).then(function(response) {
            console.log("loginStore", response.data);
            deferred.resolve(response.data);
        }).catch(function(err) {
            console.log('error logging in');
            deferred.reject(err);
        })
        return deferred.promise;
    };









    // this.editTip = function() {
    // 	var deferred = $q.defer();
    //     $http({
    //         method: 'POST',
    //         url: '/api/tips/' + userId,
    //         data: {
    //             tipDate: tipsData.date,
    //             tipAmount: tipsData.amount
    //         }
    //     }).then(function(response) {
    //         deferred.resolve(response.data)
    //     });
    //     return deferred.promise;
    // };

}); //ends service
