var app = angular.module('serveStats');


app.service('mainService', function($http, $q) {

    this.userId;
    this.userName;
    this.userLocationId;
    this.locationId;
    this.loggedIn;

    // Create User
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
                password: newUser.password,
                locationId: newUser.locationId
            }
        }).then(function(response) {
            console.log("NewUser", response);
            deferred.resolve(response.data)
        });
        return deferred.promise;
    };


    //Login User
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
            this.userLocationId = response.data.locationId;
            this.userId = response.data._id;
            this.userName = response.data.firstName;
            console.log("USER ID", this.userId, this.userName);
            this.loggedIn = true;
            console.log("loggedIn", this.loggedIn)
            deferred.resolve(response.data);

        }).catch(function(err) {
            console.log('error logging in');
            deferred.reject(err);
        })
        return deferred.promise;
    };


   this.userLoggedIn = function() {
    return loggedIn
   }



    // Post Tips Data
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


    // Display User Name 
    this.getUserName = function() {
            return userName;
        }
        // Getting Tip Data
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


    // Store Register

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

    // Store Login

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
            this.loggedIn = false;
            this.locationId = response.data._id;
            console.log(this.locationId);
            console.log("loginStore", response.data);
            deferred.resolve(response.data);
        }).catch(function(err) {
            console.log('error logging in');
            deferred.reject(err);
        })
        return deferred.promise;
    };

    // Get Server List from LocationID

    this.getServerList = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/location/' + locationId
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    }


    this.getLocalId = function() {
        return locationId
    }

    // get Location Data no
    this.locationData = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/locations'
        }).then(function(response) {
            console.log("localData", response.data);
            deferred.resolve(response.data)
        });
        return deferred.promise;
    }

    var loc = function() {
        if (this.locationId) {
            loc = locationId
        }
        if (this.userLocationId) {
            loc = userLocationId
        }
        return loc;
        console.log("locVar", loc);
    };





    this.userDatabyLoc = function() {
        var id = loc();
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/users/' + id
        }).then(function(response) {
            console.log("UserbyLocationData", response.data);
            deferred.resolve(response.data)
        });
        return deferred.promise;
    };












    // this.editTip = function() {
    //  var deferred = $q.defer();
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
