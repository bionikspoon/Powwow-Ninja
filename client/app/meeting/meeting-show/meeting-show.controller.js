'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingShowCtrl',
  function ($scope, $log, $stateParams, Restangular) {
    var meeting = Restangular.one('meetings', $stateParams.id);
    $scope.members = [];
    $scope.topics = [];
    meeting.get()//
      .then(function (meeting) {
        $log.debug('meeting-show.controller    ', 'meeting: ', meeting);
        $scope.members = meeting.members;
        $scope.topics = meeting.topics;
      });

    $scope.activeItem = null;

    $scope.setActiveItem = function (item) {
      $scope.activeItem = item;
    };

    $scope.addMember = function (member) {
      $scope.members.push({name: member.name});
      $log.debug('meeting-show.controller    ',
        '$scope.members: ',
        $scope.members);
      meeting.all('members').post(member);
    }

  });
