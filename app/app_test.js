'use strict';


describe("LatexService service", function () {
    var LatexService;

    beforeEach(module('kinetics-problems'));

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
                expect(LatexService.firstOrderSlope(1, 2, 3, 4)).toEqual('\\[-3 \\:  hrs^{-1} = {\\frac{{\\ln 1\\frac{mg}{L} - \\ln 2\\frac{mg}{L}}}{4\\: hrs}} \\]');
            });
    });

});


describe("CreatePatient service", function () {
    var CreatePatient;

    beforeEach(module('kinetics-problems'));

    beforeEach(inject(function (_CreatePatient_) {
        CreatePatient = _CreatePatient_;
    }));

    describe("adult function", function () {
        it("should return a patient age",
            function () {
                expect(CreatePatient.adult().age).toBeGreaterThan(17);
            });
    });

});


describe("AddDisease service", function () {
    var AddDisease;

    beforeEach(module('kinetics-problems'));

    beforeEach(inject(function (_AddDisease_) {
        AddDisease = _AddDisease_;
    }));

    describe("gramNegative function", function () {
        it("should return a respiratory rate",
            function () {
                expect(AddDisease.gramNegative().resp).toBeGreaterThan(10);
            });
    });

});


describe("AddDrug service", function () {
    var AddDrug;

    beforeEach(module('kinetics-problems'));

    beforeEach(inject(function (_AddDrug_) {
        AddDrug = _AddDrug_;
    }));

    describe("genttobra function", function () {
        it("should return a drug",
            function () {
                expect(AddDrug.genttobra().drug).not.toBe(null);
            });
    });

});


describe("Solver service", function () {
    var SolverService;

    beforeEach(module('kinetics-problems'));

    beforeEach(inject(function (_SolverService_) {
        SolverService = _SolverService_;
    }));

    describe("firstorderelimination function", function () {
        it("should return kel",
            function () {
                expect(SolverService.FirstOrderElimination(2, 10, "k", 8).k).toEqual(0.201);
            });
    });

});


describe("PopulationParams service", function () {
    var PopulationParams;

    beforeEach(module('kinetics-problems'));

    beforeEach(inject(function (_PopulationParams_) {
        PopulationParams = _PopulationParams_;
    }));

    describe("aminoglycoside function", function () {
        it("should return creatinine clearance",
            function () {
                expect(PopulationParams.aminoglycoside(47, 70, 1.1, 'female').ClCr).toEqual(70);
            });
    });

});



