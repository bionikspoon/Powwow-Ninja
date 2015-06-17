'use strict';

angular.module('PowwowNinjaApp')
  .controller('MeetingItemsGroupCtrl', function ($scope,$log) {
    $scope.message = 'Hello';
    $log.debug('meeting-items-group.controller  ', '$scope.items: ', $scope.items);
  });
