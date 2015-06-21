'use strict';

describe('Directive: meetingAssignments', function () {

  // load the directive's module and view
  beforeEach(module('PowwowNinjaApp'));
  beforeEach(module('app/meeting/meeting-assignments/meeting-assignments.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<meeting-assignments assignments="item.assignments"></meeting-assignments>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBeTruthy();
  }));
});
