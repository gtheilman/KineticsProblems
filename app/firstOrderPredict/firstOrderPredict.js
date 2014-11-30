'use strict';


angular.module('kinetics-problems.firstOrderPredict', ['ngRoute', 'n3-line-chart'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/firstOrderPredict', {
            templateUrl: 'firstOrderPredict/firstOrderPredict.html',
            controller: 'firstOrderPredictCtrl'
        });
    }])


    .controller('firstOrderPredictCtrl', function ($scope, LatexService, CreatePatient, PopulationParams, Problem,
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
        $scope.adultpatient.creatinine = randrange(2.5, 8);
        $scope.adultpatient.BUN = randNormal(($scope.adultpatient.creatinine * 10), 3, 0);
        $scope.disease = AddDisease.gramNegative();
        $scope.drug = AddDrug.genttobra();
        $scope.PMH = AddDisease.PMH();
        /* age, weight, creatinine, gender */
        $scope.firstOrderPredictPopulationParams = PopulationParams.aminoglycoside($scope.adultpatient.age, $scope.adultpatient.weight, $scope.adultpatient.creatinine, $scope.adultpatient.gender);
        $scope.firstOrderPredictProblem = Problem.firstOrderPredict($scope.firstOrderPredictPopulationParams.k, $scope.firstOrderPredictPopulationParams.Vd);

        $scope.initialDrawingData = [
            {
                x: $scope.firstOrderPredictProblem.InfusionBegin_time,
                value: $scope.firstOrderPredictProblem.InfusionBegin_conc,
                tooltip: "Infusion Begins"
            },
            {
                x: $scope.firstOrderPredictProblem.InfusionEnd_time,
                value: $scope.firstOrderPredictProblem.InfusionEnd_conc,
                tooltip: "Infusion Ends"
            },
            {
                x: $scope.firstOrderPredictProblem.C0_time,
                value: $scope.firstOrderPredictProblem.C0,
                tooltip: "Co = " + $scope.firstOrderPredictProblem.C0 + " mg/L @ " + moment($scope.firstOrderPredictProblem.C0_time).format('HH:mm')
            },
            {
                x: $scope.firstOrderPredictProblem.C_time,
                value: $scope.firstOrderPredictProblem.C,
                tooltip: "Time to restart drug"
            }

        ];
        $scope.initialDrawingOptions = GraphService.concTime('mg/L', $scope.drug.drug, 'linear', $scope.initialDrawingData);
        $scope.initialDrawingOptionsLog = GraphService.concTime('mg/L', $scope.drug.drug, 'log', $scope.initialDrawingData);
        $scope.riserun = LatexService.LaTeX('slope=\\frac{rise}{run}');
        $scope.firstorderslope = LatexService.firstOrderSlope("C", "C0", "k", "t");
        $scope.firstorderslope2 = LatexService.firstOrderSlope($scope.firstOrderPredictProblem.C, $scope.firstOrderPredictProblem.C0, $scope.firstOrderPredictPopulationParams.k, "t");
        $scope.firstorderslope3 = LatexService.firstOrderSlope($scope.firstOrderPredictProblem.C, $scope.firstOrderPredictProblem.C0, $scope.firstOrderPredictPopulationParams.k, $scope.firstOrderPredictProblem.deltaT);

        $scope.firstOrderElimination = LatexService.firstOrderElimination("C", "C0", "k", "t");
        $scope.firstOrderElimination2 = LatexService.firstOrderElimination($scope.firstOrderPredictProblem.C, $scope.firstOrderPredictProblem.C0, $scope.firstOrderPredictPopulationParams.k, "t");
        $scope.firstOrderElimination3 = LatexService.firstOrderElimination($scope.firstOrderPredictProblem.C, $scope.firstOrderPredictProblem.C0, $scope.firstOrderPredictPopulationParams.k, $scope.firstOrderPredictProblem.deltaT);
        $scope.goal_time = moment($scope.firstOrderPredictProblem.C0_time).add($scope.firstOrderPredictProblem.t2, 'hours').toDate();

        $scope.svgScale = 0.7;

    });



