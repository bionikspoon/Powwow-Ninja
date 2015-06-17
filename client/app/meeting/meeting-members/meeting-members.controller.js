'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingMembersCtrl', function ($scope) {

    var now = function () {
      var date = new Date();
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date;
    };

    $scope.memberConfig = {};
    $scope.checkin = function (member) {
      member.checkin = now();
    };
    $scope.checkout = function (member) {
      member.checkout = now();
    };

    $scope.toggleMemberConfig = function (index) {
      $scope.memberConfig[index] = !$scope.memberConfig[index]
    };

    $scope.toggleAddMemberForm = function () {
      $scope.showAddMemberForm = !$scope.showAddMemberForm;
    };

    $scope._addMember = function () {
      $scope.addMember({name: $scope.newMember.name});
      $scope.newMember = {};
    }
  });
