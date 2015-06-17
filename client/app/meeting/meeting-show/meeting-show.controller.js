'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingShowCtrl',
  function ($scope, $log, $stateParams, Restangular) {
    $scope.meeting = Restangular.one('meetings', $stateParams.id).get().$object;

    $scope.activeItem = null;

    $scope.setActiveItem = function (item) {
      $scope.activeItem = item;
    };

  });
