var app = angular.module('AirportApp', ['ui.router', 'AirportCtrls']);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}])

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/404');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/views/airports.html',
    controller: 'HomeCtrl'
  })
  .state('newAirport', {
    url: '/airports/new',
    templateUrl: 'app/views/newAirport.html',
    controller: 'NewCtrl'
  })
  .state('airportShow', {
    url: '/airports/:id',
    templateUrl: 'app/views/showAirport.html',
    controller: 'ShowCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/userSignup.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}]);
