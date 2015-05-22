var app = angular.module('serveStats');

app.controller('storeDashCtrl', function($scope, mainService) {
	$scope.staffList = [];
	

	 $scope.createUser = function() {
	        var newUser = {
	            firstName: $scope.firstName,
	            lastName: $scope.lastName,
	            email: $scope.email,
	            password: $scope.password,
	            locationId: $scope.locationId
	        }
	        mainService.createUser(newUser).then(function(data) {
                $scope.staffList.push({
                	firstName: $scope.firstName,
                	lastName: $scope.lastName,
                	email: $scope.email
                })
	            console.log("RegUser", data);
	        
	        });

	        $scope.firstName = "";
	        $scope.lastName = "";
	        $scope.email = "";
	        $scope.password = "";
	        $scope.locationId = "";
	        $scope.confirmPass = "";
	    }; //ends createUser

	 $scope.getServerList = function() {
	 	mainService.getServerList().then(function(data) {
	 		for (var i = 0; i < data.length; i++) {
	 			var serverObj = {
	 				firstName: "",
	 				lastName: "",
	 				email: ""
	 			}	
		 		serverObj.firstName = data[i].firstName.charAt(0).toUpperCase() + data[i].firstName.substring(1);
	            serverObj.lastName = data[i].lastName.charAt(0).toUpperCase() + data[i].lastName.substring(1);
	            serverObj.email = data[i].email;
	            $scope.staffList.unshift(serverObj);
			};
			console.log(data);
	    })
	};

	 $scope.getServerList();

     $scope.localId = function() {
     	mainService.getLocalId()
     	});
     } 

     $scope.localId();

});