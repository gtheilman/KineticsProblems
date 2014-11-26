'use strict';


angular.module('kinetics-problems.kel', ['ngRoute', 'n3-line-chart'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/kel', {
            templateUrl: 'kel/kel.html',
            controller: 'KelCtrl'
        });
    }])


    .controller('KelCtrl', function ($scope, LatexService, CreatePatient, PopulationParams, Problem,
                                     SolverService, GraphService, AddDisease, AddDrug, $timeout) {
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
        $scope.Problem = Problem.CalculateKel($scope.PopulationParams.k, $scope.PopulationParams.Vd);
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
        $scope.kelSolution = LatexService.LaTeX("k_{el} = -" + $scope.PopulationParams.k + " \\:  hrs^{-1}");
        $scope.riserun = LatexService.LaTeX('slope=\\frac{rise}{run}');
        $scope.firstOrderElimination = LatexService.firstOrderElimination("C", "C0", "k", "t");
        $scope.firstOrderElimination2 = LatexService.firstOrderElimination($scope.Problem.C, $scope.Problem.C0, "k", "t");
        $scope.firstOrderElimination3 = LatexService.firstOrderElimination($scope.Problem.C, $scope.Problem.C0, "k", $scope.Problem.deltaT);
        $scope.halflifeEquation = LatexService.LaTeX('t_{\\frac{1}{2}}=\\frac{0.693}{k_{el}}');
        $scope.halflifeSolution = LatexService.LaTeX($scope.Problem.halflife + '=t_{\\frac{1}{2}}=\\frac{0.693}{' + $scope.PopulationParams.k + '}');
    })


    .service('Problem', function () {
        this.CalculateKel = function (k, Vd) {
            var tau = randNormal((0.693 / k * 3), 2, 0);
            var tinf = randSelect([0.25, 0.5, 0.75, 1]);
            var twait = randrange(0, ((tau - tinf) / 3));
            var Cmax = Math.round(randrange(5, 12) * 10) / 10;
            var dose = tinf * Cmax * Vd * k / ( (1 - (Math.exp(-1 * k * tinf))) / (1 - (Math.exp(-1 * k * tau))) * (Math.exp(-1 * k * 0)) );
            dose = Math.round(dose / 10) * 10;
            var C0 = Cmax * (Math.exp(-1 * k * twait));
            C0 = Math.round(C0 * 10) / 10;
            var t2 = randrange(((tau - tinf - twait) / 2), ((tau - tinf - twait) / 1.1));
            var C = C0 * (Math.exp(-1 * k * t2));
            C = Math.round(C * 10) / 10;
            var now = moment();
            var labDelay = randSelect([0.75, 1, 1.25, 1.5, 1.75, 2]);
            var InfusionBegin_time = moment().subtract((tau - t2 + labDelay), 'hours');
            var InfusionEnd_time = moment(InfusionBegin_time).add(tinf, 'hours');
            var C0_time = moment(InfusionEnd_time).add(twait, 'hours');
            var C_time = moment(C0_time).add(t2, 'hours');
            var IntervalEnds_time = moment(InfusionBegin_time).add(tau, 'hours');
            var InfusionBegin_conc = C0 * (Math.exp(-1 * k * (tau - tinf - twait)));
            InfusionBegin_conc = Math.round(InfusionBegin_conc * 10) / 10;
            var InfusionEnd_conc = C0 * (Math.exp(-1 * k * (-1 * twait)));
            InfusionEnd_conc = Math.round(InfusionEnd_conc * 10) / 10;
            var deltaT = C_time.diff(C0_time, 'hours', true);
            deltaT = Math.round(deltaT * 10) / 10;
            var halflife = 0.693 / k;
            halflife = Math.round(halflife * 10) / 10;
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
                IntervalEnds_time: IntervalEnds_time,
                deltaT: deltaT,
                halflife: halflife
            };
        };
        this.tutorial = function () {
            return [
                {
                    "stepNumber": "1",
                    "stepTitle": "Draw a picture.",
                    "stepLead": "Use the information in the patient case to create a concentration-time plot. Show what we know so far about what the drug concentrations are doing.",
                    "stepCollapse": "hidestep1",
                    "rows": [
                        {
                            "frameStyle": "height:300px",
                            "leftFrame": "<linechart data='initialDrawingData' options='initialDrawingOptions'></linechart>",
                            "rightFrame": "<p>Here is the information from the patient case plotted on a linear-linear graph. Both the X-axis (time) and the Y-axis (concentration) are linear. Since {{drug.drug}} is a first-order drug, we end up with a curved plot.</p><p>Let your mouse rest over the various points on the graph to see what each one represents.</p> <p>Even though there are five different points plotted, we really only know the concentrations for the inner-most two (Co and C). The other points are just estimated based on what was described in the case. </p> <p>Here is the information from the patient case plotted on a linear-linear graph. Both the X-axis (time) and the Y-axis (concentration) are linear. Since {{drug.drug}} is a first-order drug, we end up with a curved plot. </p><p>Let your mouse rest over the various points on the graph to see what each one represents. </p> <p>Even though there are five different points plotted, we really only know the concentrations for the inner-most two (Co and C). The other points are just estimated based on what was described in the case.</p>"
                        },
                        {
                            "frameStyle": "",
                            "leftFrame": "<div ng-include='kel/kel.svg'></div>",
                            "rightFrame": "<p>Curves are difficult to work with mathematically. Straight lines are easy. Changing the Y-axis from linear to logarithmic changes the curves to straight lines. The important thing to keep in mind is that the Y-axis no longer represents 'concentration'. It now represents <b>ln concentration</b>. The X-axis (time) is still linear. </p>"
                        }
                    ]
                },
                {
                    "stepNumber": "2",
                    "stepTitle": "Second Step.",
                    "stepLead": "Use the information in the patient case to create a concentration-time plot. Show what we know so far about what the drug concentrations are doing.",
                    "stepCollapse": "hidestep2",
                    "rows": [
                        {
                            "frameStyle": "height:300px",
                            "leftFrame": "<div mathjax-bind='firstorderslope2'></div>",
                            "rightFrame": "<p>Here is the information from the patient case plotted on a linear-linear graph. Both the X-axis (time) and the Y-axis (concentration) are linear. Since {{drug.drug}} is a first-order drug, we end up with a curved plot.</p><p>Let your mouse rest over the various points on the graph to see what each one represents.</p> <p>Even though there are five different points plotted, we really only know the concentrations for the inner-most two (Co and C). The other points are just estimated based on what was described in the case. </p> <p>Here is the information from the patient case plotted on a linear-linear graph. Both the X-axis (time) and the Y-axis (concentration) are linear. Since {{drug.drug}} is a first-order drug, we end up with a curved plot. </p><p>Let your mouse rest over the various points on the graph to see what each one represents. </p> <p>Even though there are five different points plotted, we really only know the concentrations for the inner-most two (Co and C). The other points are just estimated based on what was described in the case.</p>"
                        },
                        {
                            "frameStyle": "",
                            "leftFrame": "<linechart data='initialDrawingData' options='initialDrawingOptionsLog'></linechart>",
                            "rightFrame": "<p>Curves are difficult to work with mathematically. Straight lines are easy. Changing the Y-axis from linear to logarithmic changes the curves to straight lines. The important thing to keep in mind is that the Y-axis no longer represents 'concentration'. It now represents <b>ln concentration</b>. The X-axis (time) is still linear. </p>"
                        }
                    ]
                }


            ]

        };

    });






