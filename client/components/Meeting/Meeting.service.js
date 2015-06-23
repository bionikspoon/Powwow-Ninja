'use strict';


angular.module('PowwowNinjaApp')

  .factory('Meeting',
  function ($stateParams, $log, $q, Restangular, $rootScope) {

    var convertToDate = _.curry(function (field, element) {
      if (element.hasOwnProperty(field)) { element[field] = new Date(element[field]); }
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


    var now = function () {
      var date = new Date();
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date;
    };

    var reconcile = _.curry(function (target, data) {
      Restangular.copy(data, target);
      return target;
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
      var promise = Restangular.one('meetings', $stateParams.id).get();
      return promise//
        .then(function (meeting) {
          Restangular.copy(meeting, Meeting.meeting);
          return meeting;
        })//
        .catch(function (error) {
          $log.error('Meeting.service  error: ', error);
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
      var promise = Meeting.meeting.post('items', item);
      return promise//
        .then(function (items) {
          $log.debug('Meeting.service  items: ', items);
          //Restangular.copy(items, Meeting.meeting.items);
          return items;
        })//
        .catch(function (error) {
          $log.error('Meeting.service  error: ', error);
          throw error;
        });
    };

    Meeting.addMember = function (member) {
      $log.debug('Meeting.service  Meeting.meeting.members: ',
        Meeting.meeting.members);
      Meeting.meeting.members.push(member);
      member = _.last(Meeting.meeting.members);
      $log.debug('Meeting.service  member:', member);
      var promise = Meeting.meeting.members.post(member);
      return promise //
        .then(reconcile(member))//
        .catch(function (error) {
          _.pull(Meeting.meeting.members, member);
          $log.error('Meeting.service  error: ', error);
          throw error;
        });
    };

    Meeting.updateMember = _.curry(function (field, member) {
      var update = {};
      update[field] = now();

      var promise = member.patch(update);
      return promise //
        .then(reconcile(member))//
        .catch(function (error) {
          $log.error('Meeting.service  error: ', error);
          delete member[field];
          throw error;
        });
    });

    Meeting.restangularizeItem = function (reference) {
      Restangular.restangularizeCollection(reference,
        reference.assignments,
        'assignments');
    };

    return Meeting;
  });
