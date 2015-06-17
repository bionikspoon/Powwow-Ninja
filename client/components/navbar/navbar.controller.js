'use strict';

angular.module('PowwowNinjaApp')

  .controller('NavbarCtrl',
  function ($scope, $location, Auth, Restangular, $log) {
    var meetings = Restangular.all('meetings');
    meetings.getList()//
      .then(function (meetingsList) {
        $scope.meetingsList = meetingsList;
      });
    $scope.menu = [
      {
        title: 'Dashboard',
        link: 'dashboard'
      },
      {
        title: 'Meeting',
        link: 'meeting.show({id: meetingsList[0]._id})'
      }

    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function (route) {
      return route === $location.path();
    };
  });
