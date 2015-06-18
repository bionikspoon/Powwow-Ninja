'use strict';

var convertToDate = _.curry(function (field, element) {
  if (element.hasOwnProperty(field)) { element[field] = new Date(element[field]);}
  return element;
});

var groupMeetingItems = function (data, operation, what) {
  if (what === 'items') {
    data = _(data)//
      .groupBy(function (item) {
        return item.section;
      })//
      .pairs()//
      .map(function (item) {
        return {
          title: item[0],
          items: item[1]
        };
      })//
      .value();
  }
  return data;
};

angular.module('PowwowNinjaApp')

  .factory('Meeting', function ($stateParams, Restangular) {

    Restangular.addElementTransformer('members', convertToDate('checkin'));
    Restangular.addElementTransformer('members', convertToDate('checkout'));
    Restangular.addResponseInterceptor(groupMeetingItems);

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
