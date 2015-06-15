'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingShowCtrl', function ($scope, $log) {
    $scope.activeItem = null;

    $scope.members = [
      {name: 'Bill'},
      {name: 'Bob'},
      {name: 'Sarah'},
      {name: 'Shelly'},
      {name: 'Dexter'},
      {name: 'Dracula'},
      {name: 'Pat'}
    ];

    $scope.agendaTopics = [
      {
        title: 'Follow-ups',
        items: [{title: 'Setup meetings'}]
      },
      {
        title: 'New Items',
        items: [
          {title: 'Save the world'},
          {title: 'Work on project'},
          {title: 'Solve the problem'}
        ]
      }
    ];

    $scope.setActiveItem = function (item) {
      $scope.activeItem = item;
    }

  });
