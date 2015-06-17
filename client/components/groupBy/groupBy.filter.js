'use strict';

angular.module('PowwowNinjaApp')

  .filter('groupBy', function () {
    return function (array, groupBy) {
      return _.chain(array)//
        .groupBy(function (item) {
          return item[groupBy];
        })//
        .pairs()//
        .map(function (item) {
          var obj = item[1];
          obj[groupBy] = item[0];
          return item[1];
        })//
        .value();
    };
  });
