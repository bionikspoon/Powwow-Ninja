'use strict';



angular.module('PowwowNinjaApp').controller('MeetingShowCtrl',
  function ($scope) {

    $scope.members = [
      {name: 'Bill'},
      {name: 'Bob'},
      {name: 'Sarah'},
      {name: 'Shelly'},
      {name: 'Dexter'},
      {name: 'Dracula'},
      {name: 'Pat'}
    ];
    $scope.followupItems = [];
    $scope.agendaItems = [
      {title: 'Save the world'},
      {title: 'Work on project'},
      {title: 'Solve the problem'}
    ];


    $scope.setActiveItem = function (index) {
      $scope.activeItem = /*($scope.activeItem === index) ? null :*/ index;
    }

  });
