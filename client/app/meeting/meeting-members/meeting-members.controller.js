'use strict';

angular.module('PowwowNinjaApp')

  .controller('MeetingMembersCtrl',
  function ($scope, $log, $stateParams, Restangular) {

    var members = Restangular.one('meetings', $stateParams.id).all('members');
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

    $scope.addMember = function () {
      $scope.members.push({name: $scope.newMember.name});
      members.post({name: $scope.newMember.name})//
        .then(function (members) {
          $log.debug('meeting-members.controller  ', 'members: ', members);
          $scope.members = members;
        })//
        .catch(function (error) {
          $log.error('meeting-members.controller  ', 'error: ', error);
        });

      $scope.newMember = {};
    }
  });
