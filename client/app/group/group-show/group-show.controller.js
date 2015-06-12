'use strict';

angular.module('PowwowNinjaApp')

  .controller('GroupShowCtrl', function ($scope, $log, Restangular) {
    var groups = Restangular.all('api/groups');
  });
