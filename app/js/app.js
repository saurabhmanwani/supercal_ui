'use strict';

// Declare app level module which depends on filters, and services
angular.module('superCal', [
  'ngRoute',
  'superCal.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/', {templateUrl: 'partials/Login.html', controller: 'loginContlr'});
  $routeProvider.when('/ViewRatePlans', {templateUrl: 'partials/ViewRatePlans.html', controller: 'viewRatePlanContlr'});
  $routeProvider.when('/CompareRatePlans', {templateUrl: 'partials/CompareRatePlans.html', controller: 'compareRatePlanContlr'});
  $routeProvider.when('/ViewBoltOnsByFamily', {templateUrl: 'partials/BoltOnSearch.html', controller: 'boltOnSearchContlr'});
  $routeProvider.when('/EmailBoltOnAddition', {templateUrl: 'partials/EmailBoltOnAddition.html', controller: 'emailBoltContlr'});
  $routeProvider.when('/EmailRateChangePlan', {templateUrl: 'partials/EmailRateChangePlan.html', controller: 'emailChangePlanContlr'});
  $routeProvider.when('/SearchEmailList', {templateUrl: 'partials/SearchEmails.html', controller: 'searchEmailContlr'});  
  $routeProvider.when('/BatchSearchEmail', {templateUrl: 'partials/BatchSearchEmail.html', controller: 'batchSearchEmailContlr'});  
  // $routeProvider.otherwise({redirectTo: '/view1'});
}]);