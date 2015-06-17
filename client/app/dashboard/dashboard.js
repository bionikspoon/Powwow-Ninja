'use strict';

angular.module('PowwowNinjaApp')

  .config(function ($stateProvider) {
    $stateProvider//
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/base/dashboard.html',
        controller: 'DashboardCtrl',
        authenticate: true
      });
  });
