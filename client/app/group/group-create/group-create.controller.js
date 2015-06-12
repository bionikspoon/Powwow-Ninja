'use strict';

angular.module('PowwowNinjaApp')

  .controller('GroupCreateCtrl', function ($scope, $log, Restangular) {
    var groups = Restangular.all('api/groups');

    $scope.createGroup = function () {
      groups.post({
        name: $scope.newGroup.name
      })//
        .then(function (results) {
          $log.debug('create-group.controller    ', 'results: ', results);
        })//
        .catch(function (error) {
          $log.error('create-group.controller    ', 'error: ', error);
        });

    }
  });
