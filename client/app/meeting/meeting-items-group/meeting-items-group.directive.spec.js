'use strict';

describe('Directive: meetingItemsGroup', function () {

  // load the directive's module and view
  beforeEach(module('PowwowNinjaApp'));
  beforeEach(module('app/meeting/meeting-items-group/meeting-items-group.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<meeting-items-group></meeting-items-group>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the meetingItemsGroup directive');
  }));
});