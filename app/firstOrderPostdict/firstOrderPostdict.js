'use strict';


angular.module('kinetics-problems.firstOrderPostdict', ['ngRoute', 'n3-line-chart'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/firstOrderPostdict', {
            templateUrl: 'firstOrderPostdict/firstOrderPostdict.html',
            controller: 'firstOrderPostdictCtrl'
        });
    }])


    .controller('firstOrderPostdictCtrl', function ($scope, LatexService, CreatePatient, PopulationParams, Problem,
                                                    SolverService, GraphService, AddDisease, AddDrug, $timeout) {

        $scope.Problem = [];
        $scope.adultpatient = [];
        $scope.drug = [];
        $scope.PMH = [];
        $scope.PopulationParams = [];
        $scope.steps = [];
        $scope.initialDrawingData = [];
        $scope.initialDrawingOptions = [];
        $scope.initialDrawingOptionsLog = [];

        $scope.hidePatient = false;
        $scope.hideStep1 = false;
        $timeout(function () {
            $scope.hideStep1 = true;
        }, 500);
        $scope.hideStep2 = true;
        $scope.hideStep3 = true;
        $scope.hideStep4 = true;
        $scope.hideStep5 = true;

        $scope.adultpatient = CreatePatient.adult();
        $scope.disease = AddDisease.gramNegative();
        $scope.drug = AddDrug.genttobra();
        $scope.PMH = AddDisease.PMH();
        /* age, weight, creatinine, gender */
        $scope.PopulationParams = PopulationParams.aminoglycoside($scope.adultpatient.age, $scope.adultpatient.weight, $scope.adultpatient.creatinine, $scope.adultpatient.gender);
        $scope.Problem = Problem.problemVariables($scope.PopulationParams.k, $scope.PopulationParams.Vd);
        $scope.steps = Problem.tutorial();

        $scope.initialDrawingData = [
            {
                x: $scope.Problem.InfusionBegin_time,
                value: $scope.Problem.InfusionBegin_conc,
                tooltip: "Infusion Begins"
            },
            {x: $scope.Problem.InfusionEnd_time, value: $scope.Problem.InfusionEnd_conc, tooltip: "Infusion Ends"},
            {
                x: $scope.Problem.C0_time,
                value: $scope.Problem.C0,
                tooltip: "Co = " + $scope.Problem.C0 + " mg/L @ " + moment($scope.Problem.C0_time).format('HH:mm')
            },
            {
                x: $scope.Problem.C_time,
                value: $scope.Problem.C,
                tooltip: "C = " + $scope.Problem.C + " mg/L @ " + moment($scope.Problem.C_time).format('HH:mm')
            },
            {
                x: $scope.Problem.IntervalEnds_time,
                value: $scope.Problem.InfusionBegin_conc,
                tooltip: "Dosing Interval Ends"
            }
        ];
        $scope.initialDrawingOptions = GraphService.concTime('mg/L', $scope.drug.drug, 'linear', $scope.initialDrawingData);
        $scope.initialDrawingOptionsLog = GraphService.concTime('mg/L', $scope.drug.drug, 'log', $scope.initialDrawingData);
        $scope.firstorderslope = LatexService.firstOrderSlope("C", "C0", "k", "t");
        $scope.firstorderslope2 = LatexService.firstOrderSlope($scope.Problem.C, $scope.Problem.C0, "k", "t");
        $scope.firstorderslope3 = LatexService.firstOrderSlope($scope.Problem.C, $scope.Problem.C0, "k", $scope.Problem.deltaT);
        $scope.firstOrderPostdictSolution = LatexService.LaTeX("k_{el} = -" + $scope.PopulationParams.k + " \\:  hrs^{-1}");
        $scope.riserun = LatexService.LaTeX('slope=\\frac{rise}{run}');
        $scope.firstOrderElimination = LatexService.firstOrderElimination("C", "C0", "k", "t");
        $scope.firstOrderElimination2 = LatexService.firstOrderElimination($scope.Problem.C, $scope.Problem.C0, "k", "t");
        $scope.firstOrderElimination3 = LatexService.firstOrderElimination($scope.Problem.C, $scope.Problem.C0, "k", $scope.Problem.deltaT);
        $scope.halflifeEquation = LatexService.LaTeX('t_{\\frac{1}{2}}=\\frac{0.693}{k_{el}}');
        $scope.halflifeSolution = LatexService.LaTeX($scope.Problem.halflife + '=t_{\\frac{1}{2}}=\\frac{0.693}{' + $scope.PopulationParams.k + '}');
    });

