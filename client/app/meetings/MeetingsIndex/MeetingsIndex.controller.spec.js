'use strict';

describe('Controller: MeetingsIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('PowwowNinjaApp'));

  var MeetingsIndexCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingsIndexCtrl = $controller('MeetingsIndexCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
