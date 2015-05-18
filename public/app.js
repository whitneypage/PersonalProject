var app = angular.module('serveStats', ['ngRoute', 'ui.grid']);

app.config(function($routeProvider) {

	$routeProvider
	
	.when('/', {
		templateUrl:'Register/Register.html',
		controller: 'RegisterCtrl'
	})

	.when('/dashboard', {
		templateUrl: 'Dashboard/dashboard.html',
		controller: 'DashboardCtrl'
	})

	.when('/tips', {
		templateUrl:'Tips/tips.html',
		controller: 'TipsCtrl'
	})

	.otherwise({
		redirectTo: '/'
	})


});