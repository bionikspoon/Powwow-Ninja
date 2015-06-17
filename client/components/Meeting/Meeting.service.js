'use strict';

var convertToDate = _.curry(function (field, element) {
  if (element.hasOwnProperty(field)) {
    element[field] = new Date(element[field]);
  }
  return element;
});

angular.module('PowwowNinjaApp')

  .factory('Meeting', function ($stateParams, Restangular) {

    Restangular.addElementTransformer('members', convertToDate('checkin'));
    Restangular.addElementTransformer('members', convertToDate('checkout'));
    Restangular.addElementTransformer('members', true, function (element) {
      console.log('Meeting.service    ', 'element: ', element);
      return element;
    });

    var meeting = {};

    meeting.get = function () {
      return Restangular.one('meetings', $stateParams.id).get();
    };

    meeting.membersList = function () {
      return Restangular.one('meetings', $stateParams.id).getList('members');
    };

    return meeting;
  });
