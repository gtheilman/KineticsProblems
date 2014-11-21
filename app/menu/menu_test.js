'use strict';

describe('kinetics-problems.menu DatepickerDemoCtrl', function () {

    beforeEach(module('kinetics-problems.menu'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function ($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('DatepickerDemoCtrl', {
            $scope: scope
        });
    }));
    it('should exist....',
        function () {
            //spec body
            expect(ctrl).toBeDefined();
        });

    it('should have $scope.minDate',
        function () {
            expect(scope.minDate).toBeDefined();
        });

});


