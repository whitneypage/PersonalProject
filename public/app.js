var app = angular.module('serveStats', ['ngRoute']);

app.config(function($routeProvider ) {

	$routeProvider
	
	.when('/', {
		templateUrl:'Register/Register.html',
		controller: 'RegisterCtrl'
	})

	.when('/storeLogin', {
		templateUrl:'Register/storeLogin.html',
		controller: 'storeLoginCtrl'
	})

	.when('/storeDashboard', {
		templateUrl:'StoreDashboard/storeDashboard.html',
		controller: 'storeDashCtrl'
	})

	.when('/storeStats', {
		templateUrl: 'StoreStats/storeStats.html',
		controller: 'storeStatsCtrl'
	})

	.when('/dashboard', {
		templateUrl: 'ServerStats/ServerStats.html',
		controller: 'ServerStatsCtrl' 
	})

	.when('/userStats', {
		templateUrl: 'UserStats/userStats.html',
		controller: 'userStatsCtrl'
	})

	.when('/tips', {
		templateUrl:'Tips/tips.html',
		controller: 'TipsCtrl'
	})

	.otherwise({
		redirectTo: '/'
	})
 	

});