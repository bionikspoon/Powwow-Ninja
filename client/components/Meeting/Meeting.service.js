'use strict';


angular.module('PowwowNinjaApp')

  .factory('Meeting', function ($stateParams, $log, $q, Restangular) {

    var convertToDate = _.curry(function (field, element) {
      if (element.hasOwnProperty(field)) { element[field] = new Date(element[field]);}
      return element;
    });

    var restangularize = _.curry(function (property, element) {
      if (element.hasOwnProperty(property)) {
        Restangular.restangularizeCollection(element,
          element[property],
          property)
      }
      return element;
    });

    Restangular//
      .addElementTransformer('members', convertToDate('checkin'))//
      .addElementTransformer('members', convertToDate('checkout'))//
      .addElementTransformer('meetings', false, restangularize('members'))//
      .addElementTransformer('meetings', false, restangularize('items'));


    var Meeting = {};

    Meeting.meeting = {
      members: [],
      items: []
    };

    Meeting.getAllMeetings = function () {
      return Restangular.all('meetings').getList();
    };

    Meeting.get = function () {
      var promise = Restangular.one('meetings', $stateParams.id).get()//
      return promise//
        .then(function (meeting) {
          $log.debug('Meeting.service  ', 'meeting: ', meeting);
          angular.copy(meeting, Meeting.meeting);
          return meeting;
        })//
        .catch(function (error) {
          $log.error('Meeting.service  ', 'error: ', error);
          throw error;
        });
    };

    //Meeting.membersList = function () {
    //  return Restangular.one('meetings', $stateParams.id).getList('members');
    //};

    //Meeting.itemsList = function () {
    //  return Restangular.one('meetings', $stateParams.id).getList('items');
    //};

    Meeting.addItem = function (item) {
      var promise = Meeting.meeting.all('items').post(item);
      return promise//
        .then(function (items) {
          $log.debug('Meeting.service  ', 'items: ', items);
          angular.copy(items, Meeting.meeting.items);
          return items;
        })//
        .catch(function (error) {
          $log.error('Meeting.service  ', 'error: ', error);
          throw error;
        });
    };

    Meeting.addMember = function (member) {
      var promise = Meeting.meeting.all('members').post(member);
      return promise //
        .then(function (members) {
          $log.debug('Meeting.service  ', 'members: ', members);
          angular.copy(members, Meeting.meeting.members);
          return members;
        })//
        .catch(function (error) {
          $log.error('Meeting.service  ', 'error: ', error);
          throw error;
        });
    }

    Meeting.restangularizeItem = function (reference) {
      Restangular.restangularizeCollection(reference,
        reference.assignments,
        'assignments');
    };

    return Meeting;
  });
