'use strict';

angular.module('PowwowNinjaApp')

  .controller('GroupIndexCtrl', function ($scope, $log, Restangular) {
    var groups = Restangular.all('api/groups');
    groups.getList()//
      .then(function (groupsList) {
        $scope.groupsList = groupsList;
      })
  });
