'use strict';

// Declare app level module which depends on views, and components
angular.module('mySub', [
  'ngRoute',
  'firebase',
  'mySub.subscribe'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/subscribe'});
}]);
