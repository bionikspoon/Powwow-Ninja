'use strict';

describe('Controller: MeetingMembersCtrl', function () {

  // load the controller's module
  beforeEach(module('PowwowNinjaApp'));

  var MeetingMembersCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingMembersCtrl = $controller('MeetingMembersCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
