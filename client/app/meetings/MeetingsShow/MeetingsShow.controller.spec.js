'use strict';

describe('Controller: MeetingsShowCtrl', function () {

  // load the controller's module
  beforeEach(module('PowwowNinjaApp'));

  var MeetingsShowCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingsShowCtrl = $controller('MeetingsShowCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
