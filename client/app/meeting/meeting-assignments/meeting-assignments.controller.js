'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingAssignmentsCtrl', function ($scope, $log) {
    $scope.completeAssignment = function (assignment) {
      $log.debug('meeting-assignments.controller  ',
        ' assignment: ',
        assignment);
      assignment.closed = Date.now();
      assignment.put()//
        .then(function (savedAssignment) {
          $log.debug('meeting-assignments.controller  ',
            'savedAssignment: ',
            savedAssignment);
        })//
        .catch(function (error) {
          $log.error('meeting-assignments.controller  ', 'error: ', error);
        });
    }
  });
