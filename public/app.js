var app = angular.module('serveStats', ['ngRoute']);

app.config(function($routeProvider) {

	$routeProvider
	
	.when('/', {
		templateUrl:'Register/Register.html',
		controller: 'RegisterCtrl'
	})

	.when('/dashboard', {
		templateUrl: 'dashboard/dashboard.html',
		controller: 'DashboardCtrl'
	})

	.when('/tips', {
		templateUrl:'tips/tips.html',
		controller: 'TipsCtrl'
	})

	.otherwise({
		redirectTo: '/'
	})


});