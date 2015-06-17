'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingShowCtrl', function ($scope, $log, Meeting) {

    $scope.topics = Meeting.topicsList().$object;

    $scope.activeItem = null;

    $scope.setActiveItem = function (item) {
      $scope.activeItem = item;
    };

  });
