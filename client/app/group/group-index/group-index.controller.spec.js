'use strict';

describe('Controller: GroupIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('PowwowNinjaApp'));

  var GroupIndexCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupIndexCtrl = $controller('GroupIndexCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
