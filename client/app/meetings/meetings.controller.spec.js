'use strict';

describe('Controller: MeetingsCtrl', function () {

  // load the controller's module
  beforeEach(module('PowwowNinjaApp'));

  var MeetingsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingsCtrl = $controller('MeetingsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
