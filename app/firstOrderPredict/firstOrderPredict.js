'use strict';


angular.module('kinetics-problems.firstOrderPredict', ['ngRoute', 'n3-line-chart'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/firstOrderPredict', {
            templateUrl: 'firstOrderPredict/firstOrderPredict.html',
            controller: 'firstOrderPredictCtrl'
        });
    }])


    .controller('firstOrderPredictCtrl', function ($scope, LatexService, CreatePatient, PopulationParams, firstOrderPredictProblem,
                                                   SolverService, GraphService, AddDisease, AddDrug) {
        $scope.adultpatient = CreatePatient.adult();
        $scope.adultpatient.creatinine = randrange(2.5, 8);
        $scope.adultpatient.BUN = randNormal(($scope.adultpatient.creatinine * 10), 3, 0);
        $scope.disease = AddDisease.gramNegative();
        $scope.drug = AddDrug.genttobra();
        /* age, weight, creatinine, gender */
        $scope.firstOrderPredictPopulationParams = PopulationParams.aminoglycoside($scope.adultpatient.age, $scope.adultpatient.weight, $scope.adultpatient.creatinine, $scope.adultpatient.gender);
        $scope.firstOrderPredictProblem = firstOrderPredictProblem.CalculateKel($scope.firstOrderPredictPopulationParams.k, $scope.firstOrderPredictPopulationParams.Vd);

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
                tooltip: "C0 = " + $scope.firstOrderPredictProblem.C0 + " mg/L @ " + moment($scope.firstOrderPredictProblem.C0_time).format('HH:mm')
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
    })


    .service('firstOrderPredictProblem', function () {
        this.CalculateKel = function (k, Vd) {
            var tau = 8;

            var tinf = randSelect([0.25, 0.5, 0.75, 1]);

            var twait = randrange(0, ((tau - tinf) / 5));
            var Cmax = Math.round(randrange(10, 20) * 10) / 10;
            var dose = tinf * Cmax * Vd * k / ( (1 - (Math.exp(-1 * k * tinf))) / (1 - (Math.exp(-1 * k * tau))) * (Math.exp(-1 * k * 0)) );
            dose = Math.round(dose / 10) * 10;

            var C0 = Cmax * (Math.exp(-1 * k * twait));
            C0 = Math.round(C0 * 10) / 10;

            var C = randNormal(1.3, 0.1, 1);


            var t2 = (Math.log(C / C0)) / k * (-1);

            var now = moment();
            var labDelay = randSelect([0.75, 1, 1.25, 1.5, 1.75, 2]);

            var InfusionBegin_time = moment().subtract((tinf + twait + labDelay), 'hours');
            var InfusionEnd_time = moment(InfusionBegin_time).add(tinf, 'hours');
            var C0_time = moment(InfusionEnd_time).add(twait, 'hours');
            var C_time = moment(C0_time).add(t2, 'hours');


            var InfusionBegin_conc = C0 * (Math.exp(-1 * k * (tau - tinf - twait)));
            InfusionBegin_conc = Math.round(InfusionBegin_conc * 10) / 10;

            var InfusionEnd_conc = C0 * (Math.exp(-1 * k * (-1 * twait)));
            InfusionEnd_conc = Math.round(InfusionEnd_conc * 10) / 10;

            var deltaT = C_time.diff(C0_time, 'hours', true);
            deltaT = Math.round(deltaT * 10) / 10;

            C_time = moment(C_time).toDate();
            C0_time = moment(C0_time).toDate();
            InfusionBegin_time = moment(InfusionBegin_time).toDate();
            InfusionEnd_time = moment(InfusionEnd_time).toDate();


            return {
                tinf: tinf,
                twait: twait,
                t2: t2,
                tau: tau,
                C0: C0,
                dose: dose,
                C: C,
                C_time: C_time,
                C0_time: C0_time,
                InfusionEnd_time: InfusionEnd_time,
                InfusionBegin_time: InfusionBegin_time,
                InfusionEnd_conc: InfusionEnd_conc,
                InfusionBegin_conc: InfusionBegin_conc,
                deltaT: deltaT
            };
        };


    });






