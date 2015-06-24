'use strict';

describe('Controller: MeetingShowCtrl', function () {

    // load the controller's module
    beforeEach(module('PowwowNinjaApp'));

    var MeetingShowCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MeetingShowCtrl = $controller('MeetingShowCtrl', {
            $scope: scope
        });
    }));

    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
