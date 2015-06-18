'use strict';

angular.module('PowwowNinjaApp')

  .filter('groupBy', function ($log) {
    return function (items, groupBy) {
      items = _(items)//
        .groupBy(function (item) {
          return item[groupBy]
        })//
        .value();
      $log.debug('groupBy.filter  ', 'items: ', items);
      return items;
    };
  });
