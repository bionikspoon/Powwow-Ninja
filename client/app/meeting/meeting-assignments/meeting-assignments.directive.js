'use strict';

angular.module('PowwowNinjaApp')

  .directive('meetingAssignments', function () {
    return {
      templateUrl: 'app/meeting/meeting-assignments/meeting-assignments.html',
      restrict: 'E',
      scope: {assignments: '='}
    };
  });
