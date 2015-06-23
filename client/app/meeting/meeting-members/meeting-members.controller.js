'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingMembersCtrl', function ($scope, $log, Meeting) {


    $scope.memberConfig = {};
    $scope.checkin = function (member) {
      member.checkin = now();
      member.put()
    };
    $scope.checkin = Meeting.updateMember('checkin');

    $scope.checkout = Meeting.updateMember('checkout');

    $scope.resetCheckin = function (member) {
      member.checkin = null;
      member.checkout = null;
      member.put();
    };
    $scope.resetCheckout = function (member) {
      member.checkout = null;
      member.put();
    };

    $scope.toggleMemberConfig = function (index) {
      $scope.memberConfig[index] = !$scope.memberConfig[index];
    };

    $scope.toggleAddMemberForm = function () {
      $scope.showAddMemberForm = !$scope.showAddMemberForm;
    };

    $scope.addMember = function () {
      var newMember = $scope.newMember;
      $scope.newMember = {};
      Meeting.addMember(newMember)//
        .catch(function (error) {
          $log.error('meeting-members.controller  ', 'error: ', error);
          $scope.newMember = newMember;
          throw error;
        });

    };
  });
