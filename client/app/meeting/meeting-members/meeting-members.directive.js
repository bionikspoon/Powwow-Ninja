'use strict';

angular.module('PowwowNinjaApp')

  .directive('meetingMembers', function () {
    return {
      templateUrl: 'app/meeting/meeting-members/meeting-members.html',
      restrict: 'E',
      scope: {
        members: '=',
        addMember: '='
      },
      controller: 'MeetingMembersCtrl'
    };
  });
