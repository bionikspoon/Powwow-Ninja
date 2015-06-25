'use strict';

describe('Controller: MeetingAssignmentsCtrl', function () {

   // load the controller's module
   beforeEach(module('PowwowNinjaApp'));

   var MeetingAssignmentsCtrl, scope;

   // Initialize the controller and a mock scope
   beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      MeetingAssignmentsCtrl = $controller('MeetingAssignmentsCtrl', {
         $scope: scope
      });
   }));

   it('should ...', function () {
      expect(1).toEqual(1);
   });
});
