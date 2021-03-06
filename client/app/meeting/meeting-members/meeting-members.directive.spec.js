'use strict';

describe('Directive: meetingMembers', function () {

   // load the directive's module and view
   beforeEach(module('PowwowNinjaApp'));
   beforeEach(module('app/meeting/meeting-members/meeting-members.html'));

   var element, scope;

   beforeEach(inject(function ($rootScope) {
      scope = $rootScope.$new();
      scope.meeting = {};
   }));

   it('should make hidden element visible', inject(function ($compile) {
      element = angular.element('<meeting-members  meeting="meeting"></meeting-members>');
      element = $compile(element)(scope, _, {});
      scope.$apply();
      expect(element.text()).toBeTruthy();
   }));
});
