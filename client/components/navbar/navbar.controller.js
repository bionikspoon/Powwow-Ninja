'use strict';

angular.module('PowwowNinjaApp')

  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': 'home'
      },
      {
        'title': 'Meetings',
        'link': 'meetings.index'
      },
      {
        'title': 'Meeting Auth',
        'link': 'meetings.show({id:12345})'
      },
      {
        'title': 'Meeting No Auth',
        'link': 'meetings.show({id:"ABCDE"})'
      },
      {
        'title': 'Group',
        'link': 'group.create'
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
