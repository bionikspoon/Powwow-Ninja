'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingShowCtrl',
  function ($scope, $log, $stateParams, Restangular) {
    var id = $stateParams.id;
    var meeting = Restangular.one('api/meetings', id);
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
    }

  });
