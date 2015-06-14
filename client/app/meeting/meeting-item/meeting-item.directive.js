'use strict';

angular.module('PowwowNinjaApp')

  .directive('meetingItem', function () {
    return {
      templateUrl: 'app/meeting/meeting-item/meeting-item.html',
      restrict: 'E',
      controller: 'MeetingItemCtrl',
      scope: {
        item: '=',
        activeItem: '='
      }
    };
  });
