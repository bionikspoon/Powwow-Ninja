'use strict';

angular.module('PowwowNinjaApp')

  .filter('groupBy', function ($log) {
    return _.memoize(function (input, groupBy) {
      var out = _(input)//
        .groupBy(groupBy)//
        .value();

      $log.debug('groupBy.filter  out:', out);
      return out;
    });
  });
