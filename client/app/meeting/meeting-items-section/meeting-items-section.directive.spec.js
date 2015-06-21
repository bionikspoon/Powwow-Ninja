'use strict';

describe('Directive: meetingItemsSection', function () {

  // load the directive's module and view
  beforeEach(module('PowwowNinjaApp'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<meeting-items-section></meeting-items-section>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBeFalsy();
  }));
});
