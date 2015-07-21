'use strict';

angular.module('mySub.subscribe', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/subscribe', {
    templateUrl: 'subscribe/subscribe.html',
    controller: 'SubscribeCtrl'
  });
}])

.controller('SubscribeCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

  var ref = new Firebase('https://subscription-tracker.firebaseio.com/subscribe');

  $scope.subscribe = $firebaseArray(ref);
  console.log($scope.subscribe);

}]);