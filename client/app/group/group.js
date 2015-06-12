'use strict';

angular.module('PowwowNinjaApp')

  .config(function ($stateProvider) {
    $stateProvider//
      .state('group', {
        url: '/g',
        templateUrl: 'app/group/base/group.html',
        controller: 'GroupCtrl',
        abstract: true
      })//
      .state('group.create', {
        url: '/create',
        templateUrl: 'app/group/group-create/group-create.html',
        controller: 'GroupCreateCtrl'
      })//
      .state('group.index', {
        url: '',
        templateUrl: 'app/group/group-index/group-index.html',
        controller: 'GroupIndexCtrl'
      })//
      .state('group.show', {
        url: '/{id:[0-9a-fA-F]{24}}',
        templateUrl: 'app/group/group-show/group-show.html',
        controller: 'GroupShowCtrl'
      });
  });
