'use strict';

var now = function () {
  var date = new Date();
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

angular.module('PowwowNinjaApp').controller('MeetingShowCtrl',
  function ($scope) {
    $scope.memberConfig = {};
    $scope.members = [
      {name: 'Bill'},
      {name: 'Bob'},
      {name: 'Sarah'},
      {name: 'Shelly'},
      {name: 'Dexter'},
      {name: 'Dracula'},
      {name: 'Pat'}
    ];
    $scope.agendaItems = [
      {name: 'Follow ups'},
      {name: 'Save the world'}
    ];


    $scope.checkin = function (member) {
      member.checkin = now();
    };
    $scope.checkout = function (member) {
      member.checkout = now();
    };

    $scope.toggleMemberConfig = function (index) {
      $scope.memberConfig[index] = !$scope.memberConfig[index]
    }

  });
