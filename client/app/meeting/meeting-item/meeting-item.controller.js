'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingItemCtrl', function ($scope, $log) {
    $scope.members = [
      {name: 'Bill'},
      {name: 'Bob'},
      {name: 'Sarah'},
      {name: 'Shelly'},
      {name: 'Dexter'},
      {name: 'Dracula'},
      {name: 'Pat'}
    ];

    $scope.hasOpenAssignment = function () {
      return $scope.item.hasOwnProperty('assignments') &&
             $scope.item.assignments.some(function (assignment) {
               //noinspection OverlyComplexBooleanExpressionJS
               return (assignment.hasOwnProperty('opened') &&
                      assignment.opened) &&
                      !(assignment.hasOwnProperty('closed') &&
                      assignment.closed);

             });
    };

    $scope.completeAssignment = function (assignment) {
      assignment.closed = Date.now();
      assignment.status = 'completed';
    };

    $scope.promptAssignment = false;
    $scope.newAssignment = {};
    if (!$scope.item.assignments) { $scope.item.assignments = [];}

    $scope.addAssignment = function () {
      $scope.newAssignment.opened = Date.now();
      $scope.item.assignments.push($scope.newAssignment);
      $scope.newAssignment = {};
    };

    $scope.saveNotes = function () {

    };
  });
