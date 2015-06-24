'use strict';

describe('Controller: MeetingCtrl', function () {

    // load the controller's module
    beforeEach(module('PowwowNinjaApp'));

    var MeetingCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MeetingCtrl = $controller('MeetingCtrl', {
            $scope: scope
        });
    }));

    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
