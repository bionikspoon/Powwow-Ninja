'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingAssignmentsCtrl', function ($scope, $log) {
    $scope.completeAssignment = function (assignment) {
      assignment.closed = Date.now();
      assignment.put()//
        .catch(function (error) {
          $log.error('meeting-assignments.controller  ', 'error: ', error);
        });
    };
  });
