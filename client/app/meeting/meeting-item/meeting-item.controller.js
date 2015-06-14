'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingItemCtrl', function ($scope, $log) {
    $scope.promptAssignment = false;
    $scope.newAssignment = {};
    if (!$scope.item.assignments) { $scope.item.assignments = [];}

    $scope.addAssignment = function () {
      $scope.item.assignments.push($scope.newAssignment);
      $scope.newAssignment = {};

      $log.debug('meeting-items-group.controller    ',
        '$scope.item: ',
        $scope.item);
    }
  });
