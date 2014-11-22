'use strict';


angular.module('kinetics-problems.kel', ['ngRoute', 'n3-line-chart'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/kel', {
            templateUrl: 'kel/kel.html',
            controller: 'KelCtrl'
        });
    }])


    .controller('KelCtrl', function ($scope, LatexService, CreatePatient, PopulationParams, Problem,
                                     SolverService, GraphService, AddDisease, AddDrug) {
        $scope.adultpatient = CreatePatient.adult();
        $scope.disease = AddDisease.gramNegative();
        $scope.drug = AddDrug.genttobra();
        /* age, weight, creatinine, gender */
        $scope.PopulationParams = PopulationParams.aminoglycoside($scope.adultpatient.age, $scope.adultpatient.weight, $scope.adultpatient.creatinine, $scope.adultpatient.gender);
        $scope.Problem = Problem.CalculateKel($scope.PopulationParams.k, $scope.PopulationParams.Vd);

        $scope.data = [
            {
                x: $scope.Problem.InfusionBegin_time,
                value: $scope.Problem.InfusionBegin_conc,
                tooltip: "Infusion Begins"
            },
            {x: $scope.Problem.InfusionEnd_time, value: $scope.Problem.InfusionEnd_conc, tooltip: "Infusion Ends"},
            {x: $scope.Problem.C0_time, value: $scope.Problem.C0, tooltip: "C0"},
            {x: $scope.Problem.C_time, value: $scope.Problem.C, tooltip: "C"},
            {
                x: $scope.Problem.IntervalEnds_time,
                value: $scope.Problem.InfusionBegin_conc,
                tooltip: "Dosing Interval Ends"
            }


        ];

        $scope.graphOptions = GraphService.concTime('mg/L', $scope.drug.drug, 'linear', $scope.data);

    })


    .service('Problem', function () {
        this.CalculateKel = function (k, Vd) {
            var tau = randLab(6, 0.693 / k * 4);
            tau = Math.round(tau);

            var tinf = randSelect([0.25, 0.5, 0.75, 1]);

            var twait = randLab(0, ((tau - tinf) / 2));
            var Cmax = Math.round(randLab(5, 12) * 10) / 10;
            var dose = tinf * Cmax * Vd * k / ( (1 - (Math.exp(-1 * k * tinf))) / (1 - (Math.exp(-1 * k * tau))) * (Math.exp(-1 * k * 0)) );
            dose = Math.round(dose / 10) * 10;

            var C0 = Cmax * (Math.exp(-1 * k * twait));
            C0 = Math.round(C0 * 10) / 10;

            var t2 = randLab(1, (tau - tinf - twait) / 2);
            var C = C0 * (Math.exp(-1 * k * t2));
            C = Math.round(C * 10) / 10;

            var now = moment();
            var labDelay = randSelect([0.75, 1, 1.25, 1.5, 1.75, 2]);

            var InfusionBegin_time = moment().subtract((tau + labDelay), 'hours');
            var InfusionEnd_time = moment(InfusionBegin_time).add(tinf, 'hours');
            var C0_time = moment(InfusionEnd_time).add(twait, 'hours');
            var C_time = moment(C0_time).add(t2, 'hours');
            var IntervalEnds_time = moment(InfusionBegin_time).add(tau, 'hours');

            var InfusionBegin_conc = C0 * (Math.exp(-1 * k * (tau - tinf - twait)));
            InfusionBegin_conc = Math.round(InfusionBegin_conc * 10) / 10;

            var InfusionEnd_conc = C0 * (Math.exp(-1 * k * (-1 * twait)));
            InfusionEnd_conc = Math.round(InfusionEnd_conc * 10) / 10;

            IntervalEnds_time = moment(IntervalEnds_time).toDate();
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
                IntervalEnds_time: IntervalEnds_time
            };
        };


    });






