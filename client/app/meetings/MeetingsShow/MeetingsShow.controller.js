'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingsShowCtrl', function ($scope, Marked) {
    $scope.meeting = {};

    $scope.parseNotes = function (input) {
      $scope.meeting.notes = Marked(input);
    };
  });
