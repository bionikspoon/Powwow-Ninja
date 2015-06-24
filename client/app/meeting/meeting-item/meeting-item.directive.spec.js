'use strict';

describe('Directive: meetingItem', function () {

    // load the directive's module and view
    beforeEach(module('PowwowNinjaApp'));
    beforeEach(module('app/meeting/meeting-item/meeting-item.html'));

    var element, scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
        scope.item = {};
        scope.item.assignments = [];
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<meeting-item meeting="meeting" item="item" active-item="false"></meeting-item>');
        //element = $compile(element)(scope);
        //scope.$apply();
        //expect(element.text()).toBeUndefined();
    }));
});
