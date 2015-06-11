'use strict';

angular.module('PowwowNinjaApp')

  .config(function ($stateProvider) {

    $stateProvider//
      .state('meetings', {
        url: '/meetings',
        templateUrl: 'app/meetings/meetings.html',
        controller: 'MeetingsCtrl',
        abstract: true
      })//
      .state('meetings.show', {
        url: '/{id:[0-9a-fA-F]{5}}',
        templateUrl: 'app/meetings/MeetingsShow/meetings.show.html',
        controller: 'MeetingsShowCtrl'
      })//
      .state('meetings.index', {
        url: '',
        templateUrl: 'app/meetings/MeetingsIndex/meetings.index.html',
        controller: 'MeetingsIndexCtrl'
      });
  });
