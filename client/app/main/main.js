'use strict';

angular.module('PowwowNinjaApp')

  .config(function ($stateProvider) {
    $stateProvider//
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
