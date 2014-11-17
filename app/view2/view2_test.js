'use strict';

describe('myApp.view2 View2Ctrl', function () {

    beforeEach(module('myApp.view2'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function ($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('View2Ctrl', {
            $scope: scope
        });
    }));
    it('should exist....',
        function () {
            //spec body
            expect(ctrl).toBeDefined();
        });
});


describe("LatexService service", function () {
    var LatexService;

    beforeEach(module('myApp.view2'));

    beforeEach(inject(function (_LatexService_) {
        LatexService = _LatexService_;
    }));

    describe("firstorderelimination function", function () {
        it("should return firstorderelimination symbols latex",
            function () {
                expect(LatexService.firstOrderElimination('C', 'C0', 'k', 't')).toEqual('\\[ C=C_0\\cdot e^{-k_{el}\\cdot t} \\]');
            });
    });

    describe("firstorderelimination numbers function", function () {
        it("should return firstorderelimination numbers latex",
            function () {
                expect(LatexService.firstOrderElimination(1, 2, 3, 4)).toEqual('\\[ 1=2\\cdot e^{-3\\cdot 4} \\]');
            });
    });

    describe("firstorderslope function", function () {
        it("should return firstorderslope symbols latex",
            function () {
                expect(LatexService.firstOrderSlope('C', 'C0', 'k', 't')).toEqual('\\[-k_{el} = {\\frac{{\\ln C - \\ln C_0}}{\\Delta t}} \\]');
            });
    });

    describe("firstorderslope numbers function", function () {
        it("should return firstorderslope numbers latex",
            function () {
                expect(LatexService.firstOrderSlope(1, 2, 3, 4)).toEqual('\\[-3 = {\\frac{{\\ln 1 - \\ln 2}}{\\Delta 4}} \\]');
            });
    });

});


