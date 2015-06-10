'use strict';

angular.module('PowwowNinjaApp')

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/meetings', '/meetings/');
    $stateProvider//
      .state('meetings', {
        url: '/meetings',
        templateUrl: 'app/meetings/meetings.html',
        controller: 'MeetingsCtrl',
        abstract: true
      }).state('meetings.index', {
        url: '/',
        templateUrl: 'MeetingsIndex/meetings.index.html',
        controller: 'MeetingsIndexCtrl'
      });
  });
/*//
 .state('meetings.show', {
 url: '/{id:[0-9a-fA-F]{24}}/',
 templateUrl: 'app/meetings/MeetingsShow/meetings.show.html',
 controller: 'MeetingsShowCtrl'
 })*///
