'use strict';

angular.module('PowwowNinjaApp')

  .directive('meetingItemsSection', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        showTitle: '=',
        title: '='
      },
      template: '<p ng-if="showTitle" class="lead text-muted">{{ title }}</p>' +
                '<div class="list-group" ng-transclude></div>'
    };
  });


