'use strict';


angular.module('PowwowNinjaApp')

  .factory('Meeting', function ($stateParams, $log, Restangular, $rootScope) {

    var convertToDate = _.curry(function (field, element) {
      if (element.hasOwnProperty(field)) { element[field] = new Date(element[field]);}
      return element;
    });

    Restangular.addElementTransformer('members', convertToDate('checkin'));
    Restangular.addElementTransformer('members', convertToDate('checkout'));
    Restangular.addElementTransformer('meetings', false, function (element) {
      $log.debug('Meeting.service  ', 'element: ', element);
      if (element.hasOwnProperty('members')) {
        Restangular.restangularizeCollection(element, element.members,'members')
      }
      return element;
    });


    var Meeting = {};

    Meeting.meeting = {};

    Meeting.getAllMeetings = function () {
      return Restangular.all('meetings').getList();
    };

    Meeting.get = function () {
      return Restangular.one('meetings', $stateParams.id).get()//
        .then(function (meeting) {
          angular.copy(meeting, Meeting.meeting)
        })//
        .catch(function (error) {
          $log.error('Meeting.service  ', 'error: ', error);
        });
    };

    Meeting.membersList = function () {
      return Restangular.one('meetings', $stateParams.id).getList('members');
    };

    Meeting.itemsList = function () {
      return Restangular.one('meetings', $stateParams.id).getList('items');
    };

    Meeting.addItem = function (item) {
      return Restangular.one('meetings',
        $stateParams.id).all('items').post(item);
    };

    Meeting.restangularizeItem = function (reference) {
      Restangular.restangularizeCollection(reference,
        reference.assignments,
        'assignments');
    };

    return Meeting;
  });
