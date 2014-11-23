'use strict';

describe('kinetics-problems.firstOrderPredict firstOrderPredictCtrl', function () {
    beforeEach(module('kinetics-problems'));
    beforeEach(module('kinetics-problems.firstOrderPredict'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function ($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('firstOrderPredictCtrl', {
            $scope: scope
        });
    }));
    it('should exist....',
        function () {
            //spec body
            expect(ctrl).toBeDefined();
        });
});


describe("firstOrderPredictProblem service", function () {
    var firstOrderPredictProblem;

    beforeEach(module('kinetics-problems'));

    beforeEach(inject(function (_firstOrderPredictProblem_) {
        firstOrderPredictProblem = _firstOrderPredictProblem_;
    }));

    describe("Calculate Kel function", function () {
        it("should return a patient age",
            function () {
                expect(firstOrderPredictProblem.CalculateKel(0.1, 25).dose).toBeGreaterThan(1);
            });
    });

});
