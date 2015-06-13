'use strict';

angular.module('PowwowNinjaApp')

  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': 'home'
      },
      {
        title: 'Meeting',
        link: 'meeting.show({id: "557a1a2adbd455a82cef93f1"})'
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
