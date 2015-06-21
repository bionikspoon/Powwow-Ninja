'use strict';


angular.module('PowwowNinjaApp')

  .factory('Meeting', function ($stateParams, Restangular) {

    var convertToDate = _.curry(function (field, element) {
      if (element.hasOwnProperty(field)) { element[field] = new Date(element[field]);}
      return element;
    });

    Restangular.addElementTransformer('members', convertToDate('checkin'));
    Restangular.addElementTransformer('members', convertToDate('checkout'));

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

    meeting.addItem = function (item) {
      return Restangular.one('meetings',
        $stateParams.id).all('items').post(item);
    };

    meeting.restangularizeItem = function (reference) {
      Restangular.restangularizeCollection(reference,
        reference.assignments,
        'assignments');
    };

    return meeting;
  });
