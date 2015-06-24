'use strict';

describe('Controller: MeetingItemCtrl', function () {

    // load the controller's module
    beforeEach(module('PowwowNinjaApp'));

    var MeetingItemCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        scope.item = {};
        scope.item.assignments = [];

        MeetingItemCtrl = $controller('MeetingItemCtrl', {
            $scope: scope
        });
    }));

    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
