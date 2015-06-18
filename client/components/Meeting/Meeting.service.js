'use strict';

var convertToDate = _.curry(function (field, element) {
  if (element.hasOwnProperty(field)) {
    element[field] = new Date(element[field]);
  }
  return element;
});

angular.module('PowwowNinjaApp')

  .factory('Meeting', function ($stateParams, Restangular, $log) {

    Restangular.addElementTransformer('members', convertToDate('checkin'));
    Restangular.addElementTransformer('members', convertToDate('checkout'));
    Restangular.addResponseInterceptor(function (data, operation, what, url,
      response, deferred) {
      if (what === 'items') {
        $log.debug('Meeting.service  ', 'data: ', data);

        data = _(data)//
          .groupBy(function (item) {
            $log.debug('Meeting.service  ', 'item: ', item);
            return item.section;
          })//
          .pairs()//
          .map(function (item) {
            $log.debug('Meeting.service  ', 'item: ', item);
            return {
              title: item[0],
              items: item[1]
            };
          })//
          .value();
        $log.debug('Meeting.service  ', 'data: ', data);
      }

      return data;
    });

    var meeting = {};

    meeting.getAllList = function () {
      return Restangular.all('meetings').getList();
    };

    meeting.get = function () {
      return Restangular.one('meetings', $stateParams.id).get();
    };

    meeting.membersList = function () {
      return Restangular.one('meetings', $stateParams.id).getList('members');
    };

    meeting.itemsList = function () {
      return Restangular.one('meetings', $stateParams.id).getList('items');
    };

    return meeting;
  });
