'use strict';

angular.module('PowwowNinjaApp')

  .config(function ($stateProvider) {
    $stateProvider//
      .state('meeting', {
        url: '/meeting',
        templateUrl: 'app/meeting/base/meeting.html',
        controller: 'MeetingCtrl',
        abstract: true
      })//
      .state('meeting.index', {
        url: '',
        templateUrl: 'app/meeting/meeting-index/meeting-index.html',
        controller: 'MeetingIndexCtrl'
      })//
      .state('meeting.show', {
        url: '/{id:[0-9a-fA-F]{24}}',
        templateUrl: 'app/meeting/meeting-show/meeting-show.html',
        controller: 'MeetingShowCtrl'
      })
  });
