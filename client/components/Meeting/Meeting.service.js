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
      var promise = Meeting.meeting.items.post(item);
      return promise//
        .then(function (items) {
          Restangular.copy(items, Meeting.meeting.items);
          return items;
        })//
        .catch(function (error) {
          $log.error('Meeting.service  ', 'error: ', error);
          throw error;
        });
    };

    Meeting.addMember = function (member) {
      var promise = Meeting.meeting.members.post(member);
      return promise //
        .then(function (member) {
          //angular.merge(member, member);
          Meeting.meeting.members.push(member);
          $log.debug('Meeting.service  ', 'member: ', member);
          return member;
        })//
        .catch(function (error) {
          $log.error('Meeting.service  ', 'error: ', error);
          throw error;
        });
    };

    Meeting.updateMember = _.curry(function (field, member) {
      //member = _.find(Meeting.meeting.members,member);
      member = Restangular.copy(member);
      _.set(member, field, now());

      var promise = member.patch();
      return promise //
        .then(function (memberResponse) {
          angular.merge(member, memberResponse);
          $log.debug('Meeting.service  ',
            'member,member.checkin: ',
            member,
            member.checkin);

          return memberResponse;
        })//
        .catch(function (error) {
          $log.error('Meeting.service  ', 'error: ', error);
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
