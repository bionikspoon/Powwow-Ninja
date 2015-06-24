'use strict';

describe('Controller: MeetingIndexCtrl', function () {

    // load the controller's module
    beforeEach(module('PowwowNinjaApp'));

    var MeetingIndexCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MeetingIndexCtrl = $controller('MeetingIndexCtrl', {
            $scope: scope
        });
    }));

    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
