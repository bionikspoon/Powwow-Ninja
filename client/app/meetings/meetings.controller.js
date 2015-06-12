'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingsCtrl', function ($scope, Restangular) {
    var meetings = Restangular.all('api/meetings');

    meetings.getList()//
      .then(function (meetingsList) {
        $scope.meetingsList = meetingsList;
      })

  });
