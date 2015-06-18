'use strict';

angular.module('PowwowNinjaApp')

  .directive('meetingItemsGroup', function () {
    return {
      templateUrl: 'app/meeting/meeting-items-group/meeting-items-group.html',
      restrict: 'E',
      transclude: true,
      scope: {
        items: '=',
        showTitle: '=',
        activeItem: '=',
        setActiveItem: '=',
        title: '='
      }
    };
  });
