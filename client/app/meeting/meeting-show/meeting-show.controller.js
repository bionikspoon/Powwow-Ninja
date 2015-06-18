'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingShowCtrl', function ($scope, $log, Meeting) {

    $scope.sections = Meeting.itemsList().$object;

    $scope.activeItem = null;

    $scope.setActiveItem = function (item) {
      $scope.activeItem = item;
    };

    $scope.addItem = function () {
      var item = $scope.newItem;
      $scope.newItem = {};
      item = Meeting.addItem(item).$object;
      $log.debug('meeting-show.controller  ', 'item: ', item);
    }

  });
