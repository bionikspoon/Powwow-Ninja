'use strict';

angular.module('PowwowNinjaApp')

  .directive('meetingItemsSection', function () {
    return {
      templateUrl: 'app/meeting/meeting-items-section/meeting-items-section.html',
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
