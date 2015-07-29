'use strict';

angular.module('mySub.subscribe', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/subscribe', {
    templateUrl: 'subscribe/subscribe.html',
    controller: 'SubscribeCtrl'
  });
}])


.controller('SubscribeCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  // Init Firebase
  var ref = new Firebase('https://subscription-tracker.firebaseio.com/subscribe');
  // get Subscribe
  $scope.subscribe = $firebaseArray(ref);
  // console.log($scope.subscribe);

  // Show Add Form
  $scope.showAddForm = function() {
    $scope.addFormShow = true;
  }
  // Show Edit Form
  $scope.showEditForm = function(subscribe) {
    $scope.editFormShow = true;

    $scope.name = subscribe.name;
    $scope.price = subscribe.price;
  }
  // Hide Form
  $scope.hide = function() {
    $scope.addFormShow = false;
    $scope.contactShow = false;
  }
  //  Add Subscription 
  $scope.addFormSubmit = function() {
    console.log('adding contact...')
    
    // assigning values
    if($scope.name) { var name = $scope.name } else { var name = null;}
    if($scope.price){ var price = $scope.price } else { var price = null;}

    $scope.subscribe.$add({
      name: name,
      price: price
    }).then(function(ref) {
      var id = ref.key();
      console.log('added contact with ID:'+ id)

      clearFields();

      $scope.addFormShow = false;

      $scope.msg = "subscription added"
    });
  }
  //  Edit Subscription 
  $scope.editFormSubmit = function() {
    console.log('updating subscription information')
    
    // get the id
    var id = $scope.id;
    
    // get the record
    var record = $scope.subscribe.$getRecord(id);
    
    // assigning values 
    record.name = $scope.name;
    record.price = $scope.price; 

    // save values
    $scope.subscribe.$save(record).then(function(ref){
      console.log(ref.key);
    });

    clearFields();

    // hide edit form
    $scope.editFormShow = false; 

    $scope.msg = "subscriber updated";
  }

  //  Clear forms 
  function clearFields() {
    $scope.name = '';
    $scope.price= '';
  }

  //remove 
  $scope.removeSubscription = function(subscriber){
    console.log("removing contact");

    $scope.subscribe.$remove(subscriber);
    $scope.msg = "Item has been removed";

  }

  $scope.showSubsribe = function(subscribe){
    console.log('getting contact')
    $scope.name = subscribe.name;
    $scope.price = subscribe.price;

    $scope.contactShow = true;
  }

}]);