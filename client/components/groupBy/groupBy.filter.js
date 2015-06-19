'use strict';

angular.module('PowwowNinjaApp')

  .filter('groupBy', function () {
    return _.memoize(function (input, groupBy) {
      return _(input)//
        .groupBy(groupBy)//
        .value();
    });
  });
