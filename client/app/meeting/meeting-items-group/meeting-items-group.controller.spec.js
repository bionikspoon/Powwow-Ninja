'use strict';

describe('Controller: MeetingItemsGroupCtrl', function () {

  // load the controller's module
  beforeEach(module('PowwowNinjaApp'));

  var MeetingItemsGroupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingItemsGroupCtrl = $controller('MeetingItemsGroupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
