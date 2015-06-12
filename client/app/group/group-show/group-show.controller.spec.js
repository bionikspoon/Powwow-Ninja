'use strict';

describe('Controller: GroupShowCtrl', function () {

  // load the controller's module
  beforeEach(module('PowwowNinjaApp'));

  var GroupShowCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupShowCtrl = $controller('GroupShowCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
