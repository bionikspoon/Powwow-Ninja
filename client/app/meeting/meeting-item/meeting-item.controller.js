'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingItemCtrl', function ($scope, $log, Restangular) {
    Restangular.restangularizeCollection($scope.item,
      $scope.item.assignments,
      'assignments');

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
    $scope.closeItem = function (item) {
      item.closed = Date.now();
      item.status = 'CLOSED';
      item.save()//
        .then(function (savedItem) {
          $log.debug('meeting-item.controller  ', 'savedItem: ', savedItem);
          _.merge(item, savedItem);
        })//
        .catch(function (error) {
          $log.error('meeting-item.controller  ', 'error: ', error);
        });
    };


    $scope.promptAssignment = false;
    $scope.newAssignment = {};
    if (!$scope.item.assignments) { $scope.item.assignments = [];}

    $scope.addAssignment = function () {
      var assignment = $scope.newAssignment;
      assignment.owner = $scope.newAssignment.owner;
      assignment.opened = Date.now();
      $scope.newAssignment = {};
      $scope.item.assignments.push(assignment);
      var index = _.findIndex($scope.item.assignments, assignment);
      $scope.item.assignments.post(assignment)//
        .then(function (assignment) {
          _.merge($scope.item.assignments[index], assignment);
        })//
        .catch(function (error) {
          $log.error('meeting-item.controller  ', 'error: ', error);
        });
    };

    $scope.saveItem = function () {
      $scope.item.save();
    };
  });
