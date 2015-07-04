'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingShowCtrl', function ($scope, $log, Meeting) {

    $scope.meeting = Meeting.meeting;
    Meeting.get();
    $scope.activeItem = null;


    $scope.setActiveItem = function (item) {
      $scope.activeItem = item;
    };

    //$scope.addItem = function () {
    //  var item = $scope.newItem;
    //  $scope.newItem = {};
    //  $log.debug('meeting-show.controller  ',
    //    'Meeting.addItem(item): ',
    //    Meeting.addItem(item));
    //  Meeting.addItem(item)//
    //    .catch(function (error) {
    //      $log.error('meeting-show.controller  ', 'error: ', error);
    //      $scope.newItem = item;
    //    });
    //
    //};

  });
