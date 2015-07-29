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

  $scope.showAddForm = function() {
    $scope.addFormShow = true;
  }

  $scope.hide = function() {
    $scope.addFormShow = false;
    $scope.contactShow = false;
  }

  $scope.addFormSubmit = function() {
    console.log('addining contact...')
    
    // assigning values
    if($scope.name) { var name = $scope.name } else { var name = null;}
    if($scope.price){ var price = $scope.price } else { var price = null;}

    $scope.subscribe.$add({
      name: name,
      price: price
    }).then(function(ref) {
      var id = ref.key();
      console.log('added contact with ID:'+id)

      clearFields();

      $scope.addFormShow = false;

      $scope.msg = "subscription added"
    });
  }

  function clearFields() {
    $scope.name = '';
    $scope.price= '';
  }

  $scope.showSubsribe = function(subscribe){
    console.log('getting contact')
    $scope.name = subscribe.name;
    $scope.price = subscribe.price;

    $scope.contactShow = true;
  }

}]);