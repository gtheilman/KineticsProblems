'use strict';

describe('kinetics-problems.kel kelCtrl', function () {
    beforeEach(module('kinetics-problems'));
    beforeEach(module('kinetics-problems.kel'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function ($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('KelCtrl', {
            $scope: scope
        });
    }));
    it('should exist....',
        function () {
            //spec body
            expect(ctrl).toBeDefined();
        });
});


describe("Problem service", function () {
    var Problem;

    beforeEach(module('kinetics-problems'));

    beforeEach(inject(function (_Problem_) {
        Problem = _Problem_;
    }));

    describe("Calculate Kel function", function () {
        it("should return a patient age",
            function () {
                expect(Problem.kel(0.1, 25).dose).toBeGreaterThan(1);
            });
    });

});
