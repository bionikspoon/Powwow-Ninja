'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingMembersCtrl', function ($scope, $log, Meeting) {
    $scope.meeting.members = Meeting.membersList().$object;

    var now = function () {
      var date = new Date();
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date;
    };

    $scope.memberConfig = {};
    $scope.checkin = function (member) {
      member.checkin = now();
      member.save();
    };
    $scope.checkout = function (member) {
      member.checkout = now();
      member.save();
    };

    $scope.resetCheckin = function (member) {
      member.checkin = null;
      member.checkout = null;
      member.save();
    };
    $scope.resetCheckout = function (member) {
      member.checkout = null;
      member.save();
    };

    $scope.toggleMemberConfig = function (index) {
      $scope.memberConfig[index] = !$scope.memberConfig[index];
    };

    $scope.toggleAddMemberForm = function () {
      $scope.showAddMemberForm = !$scope.showAddMemberForm;
    };

    $scope.addMember = function () {
      $scope.meeting.members.post({name: $scope.newMember.name})//
        .then(function (member) {
          $log.debug('meeting-members.controller  ', 'member: ', member);
          $scope.meeting.members.push(member);
        })//
        .catch(function (error) {
          $log.error('meeting-members.controller  ', 'error: ', error);
        });

      $scope.newMember = {};
    };
  });
