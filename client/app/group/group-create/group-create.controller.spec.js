'use strict';

describe('Controller: GroupCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('PowwowNinjaApp'));

  var GroupCreateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupCreateCtrl = $controller('GroupCreateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
