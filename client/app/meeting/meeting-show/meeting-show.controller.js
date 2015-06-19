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
      $scope.sections.post(item)//
        .then(function (item) {
          $log.debug('meeting-show.controller  ', 'item: ', item);
          $scope.sections.push(item)
        })//
        .catch(function (error) {
          $log.error('meeting-show.controller  ', 'error: ', error);
        });

    }

  });
