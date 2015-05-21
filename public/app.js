var app = angular.module('serveStats', ['ngRoute', 'ui.grid', 'ui.grid.edit']);

app.config(function($routeProvider) {

	$routeProvider
	
	.when('/', {
		templateUrl:'Register/Register.html',
		controller: 'RegisterCtrl'
	})

	.when('/storeLogin', {
		templateUrl:'Register/storeLogin.html',
		controller: 'storeLoginCtrl'
	})

	.when('/storeDashboard' {
		templateUrl:'StoreDashboard/storeDashboard.html',
		controller: 'storeDashCtrl'
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