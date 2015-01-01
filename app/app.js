'use strict';


// Declare app level module which depends on views, and components
angular.module('kinetics-problems', [
    'ngRoute',
    'kinetics-problems.menu',
    'kinetics-problems.kel',
    'kinetics-problems.firstOrderPredict',
    'kinetics-problems.firstOrderPostdict',
    'kinetics-problems.measuredCrCl',
    'kinetics-problems.cockcroftgault',
    'kinetics-problems.mdrd',
    'kinetics-problems.ckdepi',
    'kinetics-problems.version',
    'ui.bootstrap'

])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/sandboxFirstOrder', {
                templateUrl: 'calculators/firstOrderElimination.html',
                // controller: 'calculatorCtrl'
            }).
            when('/sandboxGFR', {
                templateUrl: 'calculators/gfr.html'
                // controller: 'calculatorCtrl'
            }).
            when('/sandboxMM', {
                templateUrl: 'calculators/michaelisMenten.html'
                // controller: 'calculatorCtrl'
            }).
            when('/sandboxDigoxin', {
                templateUrl: 'calculators/digoxin.html'
                // controller: 'calculatorCtrl'
            }).
            when('/sandboxSteadyState', {
                templateUrl: 'calculators/steadyState.html'
                // controller: 'calculatorCtrl'
            }).
            when('/sandboxTheophylline', {
                templateUrl: 'calculators/theophylline.html'
                // controller: 'calculatorCtrl'
            }).
            otherwise({
                redirectTo: '/menu'
            });
    }])


    .directive("mathjaxBind", function () {
        return {
            restrict: "A",
            controller: ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {
                $scope.$watch($attrs.mathjaxBind, function (value) {
                    $element.text(value == undefined ? "" : value);
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, $element[0]]);
                });
            }]
        };
    })
    .filter("sanitize", ['$sce', function ($sce) {
        return function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }])
    .filter('capitalize', function () {
        return function (input, scope) {
            if (input != null)
                input = input.toLowerCase();
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        }
    })

    .service('GraphService', function () {
        this.concTime = function (units, drug, scale, data) {
            var graphOptions = {
                axes: {
                    x: {key: 'x', type: 'date'},
                    y: {type: scale}
                },
                series: [
                    {y: 'value', color: 'steelblue', thickness: '2px', type: 'log', label: drug, dotSize: 5}
                ],
                tooltip: {
                    mode: 'scrubber',
                    formatter: function (x, y, series) {
                        var row = null;
                        data.forEach(function (datum) {
                            if (datum.x == x) {
                                row = datum;
                                return
                            }
                        });
                        return row.tooltip; // moment(x).format("HH:mm") + ', ' + y + ' ' + units;
                    }
                },
                lineMode: 'linear',
                drawLegend: 'true'

            };
            return graphOptions;
        };
    })


    .service('LatexService', function () {
        /* pass variables to create equations. If not a number, puts in variable */
        function checkVariables(C, C0, k, t) {
            if (!angular.isNumber(C)) {
                C = "C";
            } else {
                C = C + "{\\Tiny\\frac{mg}{L}}"
            }
            if (!angular.isNumber(C0)) {
                C0 = "C_0";
            } else {
                C0 = C0 + "{\\Tiny\\frac{mg}{L}}"
            }
            if (!angular.isNumber(k)) {
                k = "k_{el}";
            } else {
                k = k + " \\:  hrs^{-1}";
            }
            if (!angular.isNumber(t)) {
                t = "\\Delta t";
            } else {
                t = t + "\\: hrs"
            }
            return {
                C: C,
                C0: C0,
                k: k,
                t: t
            };
        }

        function checkCGVariables(Cl, age, weight, creat, gender) {
            if (!angular.isNumber(Cl)) {
                var result = "";
            } else {
                var result = "=" + Cl + "{\\Tiny\\frac{mL}{min}}";
            }
            if (!angular.isNumber(age)) {
                age = "Age";
            } else {
                age = age;
            }
            if (!angular.isNumber(weight)) {
                weight = "Weight";
            } else {
                weight = weight;
            }
            if (!angular.isNumber(creat)) {
                creat = "Creatinine";
            } else {
                if (gender == 0) {
                    gender = "\\times 0.85";
                } else {
                    gender = "";
                }
            }
            return {
                age: age,
                weight: weight,
                creat: creat,
                gender: gender,
                result: result
            };
        }

        function checkMDRDVariables(Cl, creat, age, gender, race, BUN, albumin) {
            if (!angular.isNumber(Cl)) {
                var result = "";
            } else {
                var result = "=" + Cl + "{\\Tiny\\frac{mL}{min}}";
            }

            if (!angular.isNumber(age)) {
                if (BUN == '' && albumin == '') {
                    age = "\\times Age ^{-0.203}";
                } else {
                    age = "\\times Age ^{-0.176}";
                }
            } else {
                if (BUN == '' && albumin == '') {
                    age = "\\times" + age + "^{-0.203}";
                } else {
                    age = "\\times" + age + "^{-0.176}";
                }
            }

            if (!angular.isNumber(creat)) {
                if (BUN == '' && albumin == '') {
                    creat = "175\\, \\times Serum\\, Creatinine ^{-1.154}";
                } else {
                    creat = "170\\, \\times Serum\\, Creatinine ^{-0.999}";
                }
            } else {
                if (BUN == '' && albumin == '') {
                    creat = "175\\, \\times" + creat + "^{-1.154}";
                } else {
                    creat = "170\\, \\times" + creat + "^{-0.999}";
                }
            }


            if (gender == 'male') {
                if (BUN == '' && albumin == '') {
                    gender = "{\\color{Gray} \\times [0.742\\,  if\\, female ]} ";
                } else {
                    gender = "{\\color{Gray} \\times [0.762\\,  if\\, female ]} ";
                }
            } else if (gender == 'female') {
                if (BUN == '' && albumin == '') {
                    gender = " \\mathbf{\\times [0.742\\,  if\\, female ]} ";
                } else {
                    gender = " \\mathbf{\\times [0.762\\,  if\\, female ]} ";
                }
            } else {
                if (BUN == '' && albumin == '') {
                    gender = "\\times [0.742\\,  if\\, female ]";
                } else {
                    gender = "\\times [0.762\\,  if\\, female ]";
                }
            }


            if (race == '') {
                if (BUN == '' && albumin == '') {
                    race = "\\times [1.210\\, if\\, black]";
                } else {
                    race = "\\times [1.180\\, if\\, black]";
                }
            } else if (race == 'African-American') {
                if (BUN == '' && albumin == '') {
                    race = "\\mathbf{\\times [1.210\\, if\\, black]}";
                } else {
                    race = "\\mathbf{\\times [1.180\\, if\\, black]}";
                }
            } else {
                if (BUN == '' && albumin == '') {
                    race = "{\\color{Gray} \\times [1.210\\, if\\, black]}";
                } else {
                    race = "{\\color{Gray} \\times [1.180\\, if\\, black]}";
                }
            }

            if (BUN == '') {
                BUN = '';
            } else if (!angular.isNumber(BUN)) {
                BUN = "\\times BUN" + "^{-0.170}";
            } else {
                BUN = "\\times" + BUN + "^{-0.170}";
            }

            if (albumin == '') {
                albumin = '';
            } else if (!angular.isNumber(albumin)) {
                albumin = "\\times Albumin" + "^{+0.318}";
            } else {
                albumin = "\\times" + albumin + "^{+0.318}";
            }
            return {
                age: age,
                race: race,
                creat: creat,
                gender: gender,
                result: result,
                albumin: albumin,
                BUN: BUN
            };
        }

        function checkckdepiVariables(Cl, creat, age, gender, race) {

            if (gender == 'male') {
                var kappa = 0.9;
                var alpha = -0.411;
                gender = "{\\color{Gray} \\times [1.018\\,  if\\, female ]} ";
            }
            else {
                gender = "\\times [1.018\\,  if\\, female ]";
                var kappa = 0.7;
                var alpha = -0.329;
            }

            if (!angular.isNumber(creat)) {
                creat = "141\\, \\times \\,  min({\\small \\frac{S_{cr}}   {\\kappa }},1)^{\\alpha }\\, \\times \\, {\\small max(\\frac{S_{cr}}{\\kappa },1)^{-1.209}}\\, ";
            } else {
                if (creat / kappa > 1) {
                    creat = "141\\, \\times \\,  min({ {\\color{Gray}  \\small \\frac{" + creat + "}   {" + kappa + " }},1)^{" + alpha + " }}\\, \\times \\, {\\small max(\\frac{" + creat + "}{" + kappa + "},{\\color{Gray} 1})^{-1.209}}\\,";
                } else {
                    creat = "141\\, \\times \\,  min({\\small \\frac{" + creat + "}   {" + kappa + " }},{\\color{Gray} 1})^{" + alpha + " }\\, \\times \\, {\\small \\color{Gray}  max({\\color{Gray} \\frac{" + creat + "}{" + kappa + "}},1)^{-1.209}}\\,";
                }
            }


            if (!angular.isNumber(age)) {
                age = "\\times Age ^{-0.176}";
            } else {
                age = "\\times" + age + "^{-0.176}";
            }

            if (race != 'African-American') {
                race = "\\times [1.180\\, if\\, black]";
            } else {
                race = "{\\color{Gray} \\times [1.180\\, if\\, black]}";
            }

            if (!angular.isNumber(Cl)) {
                var result = "";
            } else {
                var result = "=" + Cl + "{\\Tiny\\frac{mL}{min}}";
            }
            return {
                age: age,
                race: race,
                creat: creat,
                gender: gender,
                result: result
            };
        }

        this.firstOrderElimination = function (C, C0, k, t) {
            var Variables = checkVariables(C, C0, k, t);
            return "\\[ " + Variables.C + "=" + Variables.C0 + "\\cdot e^{-" + Variables.k + "\\cdot " + Variables.t + "} \\]";
        };
        this.firstOrderSlope = function (C, C0, k, t) {
            var Variables = checkVariables(C, C0, k, t);
            return "\\[-" + Variables.k + " = {\\frac{{\\ln " + Variables.C + " - \\ln " + Variables.C0 + "}}{" + Variables.t + "}} \\]";
        };
        this.cockcroftgault = function (Cl, age, weight, creat, gender) {
            var Variables = checkCGVariables(Cl, age, weight, creat, gender);
            return "\\[  Cl_{cr} " + "=\\frac{(140-" + Variables.age + ")\\cdot " + Variables.weight + "}{72\\cdot  " + Variables.creat + "} " + Variables.gender + Variables.result + " \\]";
        };
        this.ibw = function (ibw, height, gender) {
            if (gender == 1) {
                return "\\[   IBW=50kg + 2.3(" + height + "-60)=" + ibw + "kg \\]";
            } else {
                return "\\[   IBW=45.5kg + 2.3(" + height + "-60)=" + ibw + "kg \\]";
            }
        };
        this.mdrd = function (Cl, creat, age, gender, race, BUN, albumin) {
            var Variables = checkMDRDVariables(Cl, creat, age, gender, race, BUN, albumin);
            return "\\[ \\require{color}\\ eGFR=" + Variables.creat + Variables.age + Variables.gender + Variables.race + Variables.BUN + Variables.albumin + Variables.result + "\\]";
        };
        this.ckdepi = function (Cl, creat, age, gender, race) {
            var Variables = checkckdepiVariables(Cl, creat, age, gender, race);
            return "\\[ \\require{color}\\ GFR=" + Variables.creat + Variables.age + Variables.gender + Variables.race + Variables.result + "\\]";
        };
        this.LaTeX = function (str) {
            return "\\[" + str + "\\]";
        };
    }
)


    .
    service('SolverService', function () {
        this.FirstOrderElimination = function (C, C0, k, t) {
            if (!angular.isNumber(C)) {
                C = C0 * (Math.exp(-1 * k * t));
                C = Math.round(C * 10) / 10;
            }
            if (!angular.isNumber(C0)) {
                C0 = C / (Math.exp(-1 * k * t));
                C0 = Math.round(C0 * 10) / 10;
            }
            if (!angular.isNumber(k)) {
                k = (Math.log(C / C0)) / t * (-1);
                k = Math.round(k * 1000) / 1000;
            }
            if (!angular.isNumber(t)) {
                t = (Math.log(C / C0)) / k * (-1);
                t = Math.round(t * 10) / 10;
            }
            return {
                C: C,
                C0: C0,
                k: k,
                t: t
            };
        };
        this.ibw = function (height, gender) {
            if (gender == 1) {
                return Math.round(50 + 2.3 * (height - 60))
            } else {
                return Math.round(45.5 + 2.3 * (height - 60))
            }
        };
        this.mdrd = function (creat, age, gender, race) {
            var eGFR = 175 * Math.pow(creat, -1.154) * Math.pow(age, -0.203);
            if (gender == 'female') {
                eGFR = eGFR * 0.742;
            }
            if (race == 'African-American') {
                eGFR = eGFR * 1.210;
            }
            return Math.round(eGFR);
        };
    })


    .service('Problem', function () {
        this.kel = function (k, Vd) {
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
        this.firstOrderPostdict = function (k, Vd) {
            var tau = randNormal((0.693 / k * 3), 2, 0);
            var tinf = randSelect([0.25, 0.5, 0.75, 1]);
            var twait = randrange(((tau - tinf) / 3), ((tau - tinf) * 2 / 3));
            var Cmax = Math.round(randrange(5, 12) * 10) / 10;
            var dose = tinf * Cmax * Vd * k / ( (1 - (Math.exp(-1 * k * tinf))) / (1 - (Math.exp(-1 * k * tau))) * (Math.exp(-1 * k * 0)) );
            dose = Math.round(dose / 10) * 10;
            var C0 = Cmax * (Math.exp(-1 * k * twait));
            C0 = Math.round(C0 * 10) / 10;
            var t2 = randrange(((tau - tinf - twait) / 2), ((tau - tinf - twait) / 1.1));
            var C = C0 * (Math.exp(-1 * k * t2));
            C = Math.round(C * 10) / 10;

            var truetwait = randSelect([0.5, 0.75, 1]);
            var trueC0 = C0 / (Math.exp(-1 * k * (twait - truetwait)));
            trueC0 = Math.round(trueC0 * 10) / 10;


            var now = moment();
            var labDelay = randSelect([0.75, 1, 1.25, 1.5, 1.75, 2]);
            var InfusionBegin_time = moment().subtract((tau - t2 + labDelay), 'hours');
            var InfusionEnd_time = moment(InfusionBegin_time).add(tinf, 'hours');
            var C0_time = moment(InfusionEnd_time).add(twait, 'hours');
            var trueC0_time = moment(InfusionEnd_time).add(truetwait, 'hours');
            var C_time = moment(C0_time).add(t2, 'hours');
            var IntervalEnds_time = moment(InfusionBegin_time).add(tau, 'hours');
            var InfusionBegin_conc = C0 * (Math.exp(-1 * k * (tau - tinf - twait)));
            InfusionBegin_conc = Math.round(InfusionBegin_conc * 10) / 10;
            var InfusionEnd_conc = C0 * (Math.exp(-1 * k * (-1 * twait)));
            InfusionEnd_conc = Math.round(InfusionEnd_conc * 10) / 10;
            var deltaT = C_time.diff(C0_time, 'hours', true);
            deltaT = Math.round(deltaT * 10) / 10;
            var truedeltaT = C0_time.diff(trueC0_time, 'hours', true);
            truedeltaT = Math.round(truedeltaT * 10) / 10;
            var checkdeltaT = C_time.diff(trueC0_time, 'hours', true);
            checkdeltaT = Math.round(checkdeltaT * 10) / 10;
            var halflife = 0.693 / k;
            halflife = Math.round(halflife * 10) / 10;
            IntervalEnds_time = moment(IntervalEnds_time).toDate();
            C_time = moment(C_time).toDate();
            C0_time = moment(C0_time).toDate();
            trueC0_time = moment(trueC0_time).toDate();
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
                truedeltaT: truedeltaT,
                checkdeltaT: checkdeltaT,
                halflife: halflife,
                trueC0: trueC0,
                trueC0_time: trueC0_time
            };
        };
        this.firstOrderPredict = function (k, Vd) {
            var tau = 8;

            var tinf = randSelect([0.25, 0.5, 0.75, 1]);

            var twait = randrange(0, ((tau - tinf) / 5));
            var Cmax = Math.round(randrange(10, 20) * 10) / 10;
            var dose = tinf * Cmax * Vd * k / ( (1 - (Math.exp(-1 * k * tinf))) / (1 - (Math.exp(-1 * k * tau))) * (Math.exp(-1 * k * 0)) );
            dose = Math.round(dose / 10) * 10;

            var C0 = Cmax * (Math.exp(-1 * k * twait));
            C0 = Math.round(C0 * 10) / 10;

            var C = randNormal(1.3, 0.1, 1);

            InfusionEnd_conc = Math.round(InfusionEnd_conc * 10) / 10;

            var deltaT = C_time.diff(C0_time, 'hours', true);
            deltaT = Math.round(deltaT * 10) / 10;

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

            C_time = moment(C_time).toDate();
            C0_time = moment(C0_time).toDate();
            InfusionBegin_time = moment(InfusionBegin_time).toDate();
            InfusionEnd_time = moment(InfusionEnd_time).toDate();
            now = moment(now).toDate();


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
                deltaT: deltaT,
                now: now
            };
        };
        this.measuredCrCl = function (ClCr, creatinine, weight) {
            var durationUrineCollection = randrange(6, 36);
            var now = moment();
            var labDelay = randSelect([0.75, 1, 1.25, 1.5, 1.75, 2]);
            var UrineEnd_time = moment().subtract((labDelay), 'hours');
            var UrineStart_time = moment(UrineEnd_time).subtract((durationUrineCollection), 'hours');
            var UrineVolume = randNormal(1.1, 0.1, 1);
            UrineVolume = UrineVolume * ClCr / 60 * weight * durationUrineCollection;
            UrineVolume = Math.round(UrineVolume);

            var UrineCrConc = ClCr * creatinine * durationUrineCollection * 60 / UrineVolume;
            UrineCrConc = Math.round(UrineCrConc * 10) / 10;


            UrineEnd_time = moment(UrineEnd_time).toDate();
            UrineStart_time = moment(UrineStart_time).toDate();

            return {
                durationUrineCollection: durationUrineCollection,
                UrineEnd_time: UrineEnd_time,
                UrineStart_time: UrineStart_time,
                UrineVolume: UrineVolume,
                UrineCrConc: UrineCrConc

            };
        };
    }
)


    .
    service('CreatePatient', function () {
        this.adult = function () {
            if (randrange(0, 10) < 5) {
                var gender = 'male';
                var height = randNormal(70, 2, 0);
                var weight = 50 + 2.3 * (height - 60);
            } else {
                var gender = 'female';
                var height = randNormal(67, 2, 0);
                var weight = 45.5 + 2.3 * (height - 60);
            }
            height = Math.round(height);
            weight = randNormal(weight, 2, 0);
            weight = Math.round(weight);

            var age = randrange(18, 85);

            function makeinitials() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                for (var i = 0; i < 2; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length)) + '.';

                return text;
            }

            var initials = makeinitials();

            var race = randSelect([
                "white",
                "African-American",
                "Asian",
                "Hispanic",
                "Amerindian"
            ]);


            /* Renal Function */
            var creatinine = 0.9;
            var renalfailurerisk = randrange(0, 10);
            if (renalfailurerisk <= 5) {
                creatinine = Math.floor(creatinine * randrange(25, 75) / 5) / 10;
            }
            else if (renalfailurerisk > 5 && renalfailurerisk < 8) {
                creatinine = Math.floor(creatinine * randrange(10, 30)) / 10;
            }
            else if (renalfailurerisk >= 8) {
                creatinine = Math.floor(creatinine * randrange(10, 100)) / 10;
            }
            var BUN = Math.floor(9.5 * creatinine);


            /* Background Normal Labs */
            var Na = randNormal(141, 2, 0);
            var K = randNormal(4.3, 0.2, 1);
            var Cl = randNormal(103, 2, 0);
            var CO2 = randNormal(24, 5, 0);
            var glucose = randNormal(90, 8, 0);
            var Hgb = randNormal(13, 1, 1);
            var Hct = randNormal(39, 2, 0);
            var platelets = randNormal(275, 75, 0);
            var albumin = randNormal(4.1, 0.4, 1);

            var childhoodIllnesses = randSelect([
                "No significant childhood illnesses",
                "Attention-deficit hyperactivity disorder",
                "High fever and hospitalization associated with viral illness at age 5.",
                "Usual childhood illnesses.",
                "Numerous ear infections.",
                "Unremarkable.",
                "Non-significant.",
                "Acne vulgaris"
            ]);

            var trauma = randSelect([
                "No significant trauma or surgeries",
                "R ACL repair 5 yrs ago, R MCL and ACL repair 1 yr ago.",
                "No recent trauma or surgery.",
                "Head injury from fall from a swing at age 8; brief LOC with HA for two months thereafter.",
                "Tonsillectomy.",
                "None.",
                "Right ACL repair 5 yrs ago, Left MCL and ACL repair 1 yr ago.",
                "PE tubes placed bilaterally at age 15 months.",
                "No significant trauma or surgeries.",
                "MVA resulting in concussion three years ago.",
                "Tonsils removed when 10 years old; 4 wisdom teeth removed.",
                "Unremarkable.",
                "Non-significant.",
                "Open-facture of left leg two years ago secondary to a fishing accident.  No long-term complications",
                "Appendectomy five years ago"
            ]);

            var travel = randSelect([
                "None outside continental U.S.",
                "Mission trip to Honduras three years ago.",
                "None outside the U.S.",
                "Travels to Syria approximately 2x year.",
                "No recent travel history.",
                "All within U.S.",
                "None outside the USA.",
                "Unremarkable.",
                "Non-significant.",
                "Recently returned from Liberia"
            ]);

            var habits = randSelect([
                "Occasional alcohol",
                "1-2 ppd smoker",
                "2-3 cups of coffee per day",
                "Denies h/o abuse of illicit substances.",
                "Occasional EtOH in the past.",
                "+ EtOH (6 beers/day), + tob (5 pk/yr), -IVDA, remote hx cocaine use.",
                "Denies smoking.  Denies coffee (“makes me jittery”).  Denies illicit substances.",
                "EtOH socially; no tobacco.",
                "Remote history of cocaine use, but states has not used in 'years'.",
                "Denies alcohol and illicit drugs.",
                "Occasional alcohol (wine).",
                "Frequent EtOH (3-4 beers per day).",
                "Drinks alcohol (beer) “rarely,” maybe once a month.",
                "Rare EtOH use in the last year only on special occasions or holidays.",
                "2-3 glasses of bourbon most days.",
                "Smokes occasionally, but only when drinks.",
                "1 ppd.",
                "Smokes cigarettes (2.5 ppd).",
                "Currently smokes one ppd; no alcohol; drinks coffee, 3 cups in the morning and 1 cup in the evening (used to drink three cups in evening but has cut down over the past few months).",
                "Previous smoker (quit 3 years ago).",
                "Currently smokes 1 ppd.",
                "Minimal alcohol on social occasions.  No tobacco.  Moderate caffeine, 2 cups/day, +/- 1 diet Cola.",
                "Minimal alcohol on social occasions.  No tobacco.  Moderate caffeine, 2 cups/day, +/- 1 diet Cola.",
                "Drinks 2-3 cups coffee/day.",
                "Drinks 3-4 cups regular coffee day.",
                "Drinks 2-3 soft drinks per day and sweet tea with most meals.",
                "Drinks 'a lot' of coffee. Denies ingestion of tea or cola.",
                "Occasional recreational marijuana use",
                "Eats 3 meals a day most days.",
                "No regular exercise.",
                "Exercises 3-4 times per week.",
                "Does not drink alcohol, smoke, or use illegal drugs.",
                "No dietary restrictions.  Usually sleeps well.",
                "Reports a 'typical' fast food diet.",
            ]);

            var immunizations = randSelect([
                "UTD",
                "Completed usual childhood vaccines",
                "Flu shot last October",
                "Flu vaccine in September, Tetanus 2 years ago, all childhood immunizations.",
                "Usual childhood immunizations but states that his family has been “against the flu shot” since his aunt received one several years ago and died soon afterwards.",
                "Standard recommended childhood immunizations.",
                "Usual childhood immunizations.",
                "Flu shot annually, Tetanus July.",
                "Tetanus booster earlier this year following cut on hand"
            ]);

            var familyHistory = randSelect([
                "Father died at age 57 of MI.  Mother with diabetes.",
                "Mother and father in good health.  Sister with major depressive disorder.",
                "Family history of colon cancer.  Brother with HTN.",
                "Father:  DM2, HTN, HLP, cirrhosis, MI @ 44 yo, deceased at 56 yo.",
                "Mother: HTN, DM2, obesity, metabolic syndrome, still alive.",
                "Brother:  HLP, HTN, MI @ 48 yo, still alive.",
                "Mother and brother healthy.",
                "Father, 47, has had progressive tremor x 20 yrs., fears Parkinson's disease but has not sought evaluation.",
                "FH + for colon Ca, HTN, AD.",
                "Both parents alive; 56 yo father with perennial allergic rhinitis & HTN; 52 yo mother with osteopenia; older sister with hx of asthma.",
                "Father:  DM2, HTN, Dyslipidemia, cirrhosis, MI @ 44 yo, deceased at 56 yo.",
                "Mother: HTN, DM2, obesity, metabolic syndrome, still alive.",
                "Brother:  Dyslipidemia, HTN, MI @ 48 yo, still alive.",
                "Both parents deceased (father from heart disease and mother from lung cancer).",
                "Has 2 brothers, one with HTN and CAD and one with COPD.",
                "Father, 36, diabetes; mother, 32, GH; sister, 12, and brother, 10, both GH.",
                "Maternal grandmother, 56, breast cancer, in remission two years.  Paternal grandfather died at age 68 w/ CHF.",
                "Father had prostate cancer, which was discovered a year before he died of a stroke (age 72).",
                "Mother, age 75, diabetes and hypertension.  3 brothers, all living, all have diabetes and hypertension.",
                "Older brother was recently diagnosed with prostate cancer, resolved through surgery.",
                "Both parents living.  Father and mother in good health (no chronic illnesses or heart disease).  Maternal grandmother had diabetes.",
                "Father died of natural causes at 72.  Mother died of unknown cancer at age 52.  One sister GH.  Two brothers, one w/ hx AMI x 1, the other w/ hyperlipidemia.",
                "Mother died at age 89 from CHF. Father died at age 78 of prostate cancer. 2 brothers living, 1 with CVA, the other with previous MI and type 2 DM.",
                "Has a twin brother with asthma.  Father with COPD.",
                "Unremarkable.",
                "Non-significant."
            ]);
            var socialHistory = randSelect([
                "Works as a bus driver.  Health insurance through employer.",
                "Currently unemployed.   Receiving Social Security benefits",
                "Married. Lives with spouse in Madison, Mississippi.",
                "Works part-time in clothing store.",
                "Became a US citizen recently.",
                "Has private insurance.",
                "Has Medicare.",
                "Has BCBS of Mississippi.",
                "Insurance through Medicaid.",
                "Health insurance through employer.",
                "Married x 2 yrs., lives w/ spouse.",
                "Born in Canada and is a naturalized citizen.",
                "In the first year of the Cosmetology program at Virginia College.",
                "No children.",
                "Unremarkable.",
                "Non-significant.",
                "Has worked for the University of MS for 1 year.",
                "Employed by the State.   Blue Cross and Blue Shield insurance.",
                "Plays jazz trumpet in a band.  Self-insured."
            ]);
            var allergies = randSelect([
                "Lisinopril (angioedema).",
                "morphine (itching).",
                "heparin (HIT).",
                "enoxaparin (HIT).",
                "NKDA.  Very reactive to pollen and dust.",
                "Ibuprofen (face swelling).",
                "NKDA.  No known drug, food, or environmental intolerances.",
                "PCN (nausea).",
                "Sulfa (airway affected).",
                "None",
                "NKA",
                "NKDA"
            ]);
            var generalROS = randSelect([
                "Reports frequent fatigue over last several months.",
                "Denies fever, chills, or weight changes.",
                "Seems stressed.",
                "Nervous appearing in obvious distress.",
                "No recent fever or chills. Increasing fatigue over past month.",
                "Sleep is irregular and much worse in the last several days.",
                "Slight fever. Body Aches. Fatigued. Has lost “several” lbs.",
                "Pt c/o nervousness, worrying all the time.",
                "No fatigue, fever, chills.  Sometimes has excessive sweating."
            ]);
            var HEENT_ROS = randSelect([
                "Occasional blurry vision.",
                "Wears glasses.  Nl corrected acuity.  Denies diplopia or pain.",
                "Normal acuity, no diplopia, blurring, pain, discharge.",
                "Wears contacts.",
                "No complaints about vision.",
                "No visual changes or disturbances.",
                "Wears glasses.",
                "Vision clear without blurring, redness or itching.",
                "(+) myopia.",
                "PERRLA, EOMI; Discs sharp w/out exudate.",
                "No c/o visual disturbances or pain.",
                "NCAT.",
                "No ear pain or tinnitus.",
                "Nl acuity. Denies past infections, tinnitus, or pain.",
                "Normal acuity, no recent infections, tinnitus, pain, or discharge.",
                "No tinnitus, pain, or discharge.",
                "Frequent tinnitus.",
                "Normal hearing, no recent infections; no tinnitus, pain, or discharge.",
                "Denies recent sore throat.",
                "No recent sore throat.",
                "Denies frequent sore throats.",
                "No complaints except frequent dry mouth.",
                "No dental problems.",
                "Oropharynx -, no exudates or petechiae noted.",
                "No sore throat.  Thirsty.",
                "No neck pain noted.",
                "Neck supple. No bruits or JVD.",
                "HAs for last 2 months that are steady w/o photophobia, N, or V.",
                "No HA.",
                "Denies H/A or dizziness.",
                "c/o headache but no dizziness.",
                "No c/o HA or dizziness.",
                "C/O occasional HA.",
                "Has occasional headaches, a few times a week.  Has dizziness when nervous.",
                "No nasal discharge, epistaxis or odd odors. No throat pain, hoarseness or difficulty swallowing.  No snoring or apneic episodes reported by patient.",
                "Occasional sense of odd unpleasant odor.  Frequent sinus sxs.  No epistaxis.",
                "No pain, epistaxis, discharge, or perception of odd odors.",
                "No epistaxis, discharge, odd odors.",
                "(+) Nasal allergies, congestion.",
                "No epistaxis or discharge.",
                "No c/o nasal congestion."

            ]);
            var cv_ROS = randSelect([
                "Denies coughing or pain.",
                "(+) SOB, Chest tightness. (+) DOE, (-) fever, chills, nightsweats.",
                "Chest tightness. Occasional chest pain.",
                "Mild SOB over last month.",
                "Mild wheezing, no hemoptysis.",
                "No cough or wheezing.   No hemoptysis.",
                "Doesn’t know when had CXR or TB skin test.",
                "Denies SOB or wheezing.",
                "Denies CP, palpitations, h/o heart murmur, MI.",
                "No cough or wheezing. No history of breathing problems, no hemoptysis",
                "Denies palpitations.",
                "Denies chest pain.",
                "Describes “racing heart rate” occurring several times throughout the week that has increased in frequency over the past week.",
                "No orthopnea, history of heart murmur.",
                "No c/o CP, palpitations, orthopnea.",
                "Slight DOE.",
                "No chest pain.  Negative for hx of palpitations, SOB, orthopnea, heart murmur, heart attack, or rheumatic fever.",
                "No c/o chest pain, palpitations, DOE or PND.",
                "No chest pain. Negative for h/o orthopnea, SOB, heart attack"
            ]);
            var gu_ROS = randSelect([
                "No complaints.  Denies h/o STD.",
                "No dysuria, gross hematuria, or incontinence.",
                "Frequent urination, but no dysuria.",
                "No hesitancy, hematuria, incontinence.",
                "Negative for GU complaints.",
                "No dysuria, frequency, hesitancy or urgency.",
                "Denies hematuria and pain on urination. Hesitation, urgency, and nocturia x3. Fullness after voiding"
            ]);
            var gi_ROS = randSelect([
                "Nl appetite. Denies N/V/D/C, abd. pain, or HB.",
                "Denies laxative or antacid use.",
                "Denies problems other than acute n/v.",
                "Denies hemoptysis, hematochezia, or melena.",
                "Some decreased appetite, no nausea, vomiting, diarrhea, or constipation.",
                "No diarrhea or constipation.",
                "Reports some vague abdominal pain, worse after eating.",
                "Denies N/V/D.",
                "Diminished appetite over last year or so.",
                "Denies heartburn.  No antacid use.",
                "Normal appetite; no N/V/D.  No dyspepsia or reflux.  Normal BMs.",
                "No polyuria, polyphagia or polydipsia.  No heat intolerance.",
                "Denies rectal bleeding or black, tarry stools"
            ]);
            var neuro_ROS = randSelect([
                "Denies syncope, vertigo, unilateral weakness, paralysis, numbness,  paraesthesias, or stroke.",
                "Cranial nerves appear grossly intact.",
                "No syncope, vertigo, paralysis, numbness, tingling.",
                "C/o feeling 'shaky'.",
                "Reports no weakness or change in mood.  Frequent fatigue.",
                "Often feels stiff and tense in neck and shoulders.",
                "No syncope, vertigo, weakness or paralysis, numbness, or tingling.",
                "No hx of psychiatric difficulties.",
                "No syncope, vertigo, or diplopia.",
                "No numbness, tingling, weakness or paralysis.",
                "No h/o depression or memory loss or anxiety.",
                "Mild syncope and weakness reported.",
                "No paralysis. Denies tremors."
            ]);
            var ext_ROS = randSelect([
                "Extremities with symmetrical motion and strength. No c/c/e.",
                "Occasional athlete’s foot.",
                "Reports mild knee pain about once a month, relieved with OTC aspirin",
                "Mild arthritis-like pain in right hip and both knees.",
                "No muscle pain or cramps."
            ]);
            var skin_ROS = randSelect([
                "Denies rashes, hives, eczema, or bruising.",
                "No atopic dermatitis.",
                "No rashes, dryness, or color changes.",
                "No unusual pigmentation, scars, lesions, bruises, or rashes.",
                "No rashes, hives, eczema, bruising.",
                "No rashes, hives or bruising.",
                "No itching, rash, or bruising.",
                "No echymosis noted, no lesions or deformities.",
                "No rashes or dryness"

            ]);
            var generalPE = randSelect([
                "In acute distress, appears stated age.",
                "Appears tired, but NAD.",
                "WDWN {{gender}}.",
                "Appears stated age. Obese.",
                "Anxious, but in no acute distress.",
                "Pleasant, fatigued.",
                "Appears mildly anxious and fatigued with dark rings under eyes."
            ]);
            var skin_PE = randSelect([
                "Diaphoretic, pale, nl skin turgor, -lesions/rash.",
                "No unusual pigmentation, scars, lesions, bruises, or rashes.",
                "no clubbing, no discoloration.",
                "Diaphoretic and pale. Normal skin turgor. (-) lesions/rashes.",
                "No unusual pigmentation, scars, lesions, bruises, rashes.",
                "No lesions, nl pigmentation, nl turgor.",
                "Mucous membranes slightly dry, poor skin turgor.  No rashes.",
                "Unremarkable.",
                "WNL.",
                "Non-significant.",
                "Warm, dry.  No rashes or lesions.  Skin turgor normal.  Hair distribution normal."
            ]);
            var HEENT_PE = randSelect([
                "NCAT, PERRLA, EOMI, sclera anicteric.",
                "NCAT.",
                "No carotid bruits.",
                "PERRLA.",
                "PERRLA.  Globes slightly shrunken and soft.",
                "Nl discs.  No retinopathy.",
                "Anicteric sclera, pupils equal and round, extra-ocular movements grossly intact.",
                "NC/AT. PERRLA, EOMI, sclera anicteric.",
                "PERRLA, EOMI.",
                "Discs sharp.",
                "Conjunctivae clear.  No scleral icterus, PERRLA.  EOMI.  Normal gross visual acuity.",
                "Discs sharp; no retinopathy.",
                "No hemorrhages or exudates.",
                "Discs sharp w/out exudates.",
                "Discs sharp.  No retinopathy.",
                "No hemorrhages or exudates.",
                "No hemorrhages or exudates.TMs clear with visible light reflex and bony landmarks.",
                "Ear canals are clear.  Tympanic membranes are gray.  Hearing acuity seems wnl.",
                "Canals clear.  TMs opaque.",
                "TMs shiny, gray; cerumen present.",
                "External canal clear.  TMs normal.",
                "No discharge.  Negative for nasal polyps.",
                "TMs gray and shiny bilaterally.",
                "NCAT, (+) nasal polyps, Clear nasal discharge.",
                "Nl dentition, No lesions.",
                "Normal dentition.  No lesions.",
                "Nares patent without redness, swelling or exudate.",
                "Unremarkable.",
                "WNL.",
                "Non-significant.",
                "Normocephalic, PERRLA, neck supple, no bruits or JVD"

            ]);
            var neck_PE = randSelect([
                "Supple, no thyromegaly.",
                "Supple w/o thyroid enlargement.",
                "No palpable lymph nodes.",
                "No thyromegaly or JVD.",
                "Supple, thyroid wnl.",
                "Supple. Non-tender. No thyromegaly.",
                "No tenderness.",
                "Supple w/ no thyromegaly.",
                "Supple.  No JVD.",
                "Unremarkable.",
                "WNL.",
                "Non-significant.",
                "Supple.  No masses or thyromegaly.",
                "Nl on palpation"

            ]);
            var chest_PE = randSelect([
                "CTAB, -w/r/r.",
                "CTAB, (-) w/r/r.",
                "Nl contour, symmetry.  No tenderness, dullness to percussion, or wheezing on auscultation.",
                "Slight wheezing upon auscultation.",
                "Lungs CTA, normal respiratory effort.",
                "Normal contour, expansion.",
                "No tenderness.",
                "Nl contour, symmetry, expansion.",
                "No tenderness, tactile fremitus.",
                "No excursion, no dullness.",
                "CTA.",
                "Breathing equal bilaterally.  Normal contour, symmetry, but slightly decreased expansion.",
                "Clear to percussion throughout.  No wheezing.",
                "Symmetrical chest expansion and respiratory effort.",
                "Clear to A&P.  No wheezes, rales or ronchi.",
                "Unremarkable.",
                "WNL.",
                "Non-significant.",
                "Clear to auscultation and percussion, no adventitious lung sounds"
            ]);
            var cv_PE = randSelect([
                "RRR, -m/r/g, nl s1/s2.",
                "RRR.  No MRG.",
                "RRR. Upon first auscultation sounds similar to heart murmur,  Repeat auscultation negative.",
                "RRR, (-) m/r/g, normal S1 and S2.",
                "CTA bilaterally.",
                "RRR w/o M or G.",
                "Unremarkable.",
                "WNL.",
                "Non-significant.",
                "RRR w/out murmur.",
                "PMI 5th ICSMCL, no thrills. RRR w/o murmurs, rubs or gallops.",
                "No bruits. All pulses full and equal bilaterally. No CCE. No JVD.",
                "RRR, no MRG"
            ]);
            var abd_PE = randSelect([
                "BS (+).  No tenderness or organomegaly.",
                "s/nt/nd, +bs, -HSM.",
                "NTND, (+) BS, no HSM or masses.",
                "S/NT/ND, (+) BS, (-) HSM.",
                "Soft, NTND. No HSM.",
                "Soft, non-tender, without masses; Normal BS.",
                "Soft, NT.  Nl BS.  Nl liver.",
                "Soft, non-tender.  (+) BS.  No organomegaly.",
                "NTND.  (+) BS.  No organomegaly.",
                "Soft, NTND, nl BS, mild splenomegaly.",
                "Unremarkable.",
                "WNL.",
                "Non-significant.",
                "Soft and non-tender. Active BS in four quadrants.  No masses or organomegaly noted.",
                "NTND, (+) BS, no organomegaly "
            ]);
            var neuro_PE = randSelect([
                "Nl cognition.  No dysarthria, dysphasia or frontal release signs.",
                "Discs sharp.  EOM full, w/ moderate endpoint nystagmus.  Visual fields full to confrontation.  Facial sensation normal.  No facial or lingual paresis.",
                "Intact to light touch, pinprick, temperature, vibration, and joint position sense.",
                "No pronator sign.  Strength and tone normal.  Mild postural tremor, persisting diminished in action, but no tremor at rest.",
                "Fine finger movements, rapid alternating movements, finger-to-nose, and heel-to-shin testing all nl.",
                "Biceps, triceps, brachioradialis, patellar, and ankle reflexes all brisk.  Pectoralis absent.  Plantar responses downgoing bilaterally.",
                "Alert and oriented.",
                "AAO x 4. CN II – XII intact. Moves all extremities without difficulty.",
                "Awake, alert, cranial nerves grossly intact.",
                "A&O x 3.",
                "Cranial Nerves II-XII intact.",
                "Grip strength 5/5 bilaterally.  Reflexes are normal.",
                "Alert, nl memory, judgment, mood.",
                "Cranial Nerves Intact.",
                "Nl grip strength, DTR (+).",
                "Nl sensitivity to touch, pain, vibration, heat and cold.",
                "Normal grip strength, bilaterally symmetric.   DTR 2 + and equal.",
                "Intact to light touch and sharp bilaterally.",
                "AAOx4, CN II-XII intact, moves all ext without difficulty.",
                "Normal ROM, no effusions or deformities.  Extremities - no edema.",
                "No focal weakness.  No abnormalities of muscle tone.  Reflexes 1+.",
                "Cranial nerves II-XII intact; normal sensation.  Muscle strength and tone normal in all extremities.",
                "Patellar and brachial DTRs 2+ and equal.  Normal gait.",
                "Unremarkable.",
                "WNL.",
                "Non-significant.",
                "Alert and oriented x 3.  Intact memory, normal affect, judgment and insight.",
                "Awake, alert, cranial nerves grossly intact"
            ]);
            var gu_PE = randSelect([
                "Deferred",
                "Normal genitalia"
            ]);
            var ext_PE = randSelect([
                "-c/c/e.",
                "Pulses present and symmetric.  No CCE.",
                "No CCE.",
                "(-) C/C/E.",
                "Unremarkable.",
                "WNL.",
                "Non-significant.",
                "Pulses symmetric bilaterally.",
                "Joints w/ good mobility, no deformity.",
                "No CCE.  Nl muscle mass."
            ]);

            return {
                initials: initials,
                gender: gender,
                age: age,
                race: race,
                creatinine: creatinine,
                BUN: BUN,
                Na: Na,
                K: K,
                Cl: Cl,
                CO2: CO2,
                glucose: glucose,
                height: height,
                weight: weight,
                Hgb: Hgb,
                Hct: Hct,
                platelets: platelets,
                albumin: albumin,
                childhoodIllnesses: childhoodIllnesses,
                trauma: trauma,
                travel: travel,
                habits: habits,
                immunizations: immunizations,
                familyHistory: familyHistory,
                socialHistory: socialHistory,
                allergies: allergies,
                generalROS: generalROS,
                HEENT_ROS: HEENT_ROS,
                cv_ROS: cv_ROS,
                gi_ROS: gi_ROS,
                gu_ROS: gu_ROS,
                neuro_ROS: neuro_ROS,
                ext_ROS: ext_ROS,
                skin_ROS: skin_ROS,
                skin_PE: skin_PE,
                HEENT_PE: HEENT_PE,
                neck_PE: neck_PE,
                chest_PE: chest_PE,
                cv_PE: cv_PE,
                abd_PE: abd_PE,
                neuro_PE: neuro_PE,
                gu_PE: gu_PE,
                ext_PE: ext_PE

            };
        };
    })


    .service('AddDisease', function () {
        this.gramNegative = function () {
            var temp = Math.round(randrange(100.5, 103) * 10) / 10;
            var WBC = Math.round(randrange(10.5, 15) * 10) / 10;
            var hr = Math.round(randrange(90, 110));
            var resp = randrange(15, 30);
            var diagnosis = randSelect([
                "sepsis",
                "pneumonia"
            ]);

            var systolic = randNormal(120, 10, 0);
            var diastolic = randNormal(80, 7.5, 0)
            return {
                temp: temp,
                WBC: WBC,
                resp: resp,
                diagnosis: diagnosis,
                hr: hr,
                systolic: systolic,
                diastolic: diastolic
            };
        };
        this.PMH = function () {

            function pastMeds(disease) {
                var med = {
                    'Adult Acne': function () {
                        return 'Isotretinoin';
                    },
                    'Anemia': function () {
                        return 'Iron';
                    },
                    'Arthritis': function () {
                        return 'Feldene';
                    },
                    'Depression': function () {
                        return 'Fluoxetine';
                    },
                    'Duodenal ulcers': function () {
                        return 'Omeprazole';
                    },
                    'Fibromyalgia': function () {
                        return 'Duloxetine';
                    },
                    'GERD': function () {
                        return 'Prilosec';
                    },
                    'Hyperthyroidism': function () {
                        return 'PTU';
                    },
                    'Hypothyroidism': function () {
                        return 'Levothyroxine 150 mcg po daily';
                    },
                    'Irritable Bowel Syndrome': function () {
                        return 'Loperamide prn';
                    },
                    'Lupus erythematosus': function () {
                        return 'Prednisone';
                    },
                    'Ménières disease': function () {
                        return 'Cyclobenzprine';
                    },
                    'Multiple sclerosis': function () {
                        return 'Inteferon';
                    },
                    'Migraine': function () {
                        return 'Propranolol';
                    },
                    'Myasthenia gravis': function () {
                        return 'Interferon';
                    },
                    'Psoriasis': function () {
                        return 'Coal Tar';
                    },
                    'Rheumatoid arthritis': function () {
                        return 'Methotrexate';
                    },
                    'Gastric ulcers': function () {
                        return 'Cimetidine';
                    },
                    'Schizophrenia': function () {
                        return 'Haldol';
                    },
                    'Tuberculosis': function () {
                        return 'Completed 3-drug regimen';
                    },
                    'Ulcerative Colitis': function () {
                        return 'Betamethasone';
                    },
                    'Crohns Disease': function () {
                        return 'Asacol';
                    }
                };
                return med[disease];
            }

            var disease = randSelect([
                "Adult Acne",
                "Anemia",
                "Arthritis",
                "Depression",
                "Duodenal ulcers",
                "Fibromyalgia",
                "GERD",
                "Hyperthyroidism",
                "Hypothyroidism",
                "Irritable Bowel Syndrome",
                "Lupus erythematosus",
                "Ménière's disease",
                "Migraine",
                "Multiple sclerosis",
                "Myasthenia gravis",
                "Psoriasis",
                "Rheumatoid arthritis",
                "Gastric ulcers",
                "Schizophrenia",
                "Tuberculosis",
                "Ulcerative Colitis",
                "Crohn's Disease"
            ]);

            var qualifier = randSelect([
                "controlled by medications",
                "in remission",
                "currently asymptomatic",
                "controlled",
                "not currently symptomatic"
            ]);


            var pastRegimen = pastMeds(disease);

            return {
                disease: disease,
                pastRegimen: pastRegimen,
                qualifier: qualifier
            };
        };
    })


    .service('AddDrug', function () {
        this.genttobra = function () {
            var drug = randSelect([
                "gentamicin",
                "tobramycin",
                "netilmicin"
            ]);
            return {
                drug: drug
            };
        };
        this.amikacinkanamycin = function () {
            var drug = randSelect([
                "amikacin",
                "kanamycin"
            ]);

            return {
                drug: drug
            };
        };


    })


    .service('PopulationParams', function () {
        /* given patient params,calculates population average and then introduces some variablity */
        this.aminoglycoside = function (age, weight, creatinine, gender) {
            var ClCr = (140 - age) * weight / 72 / creatinine;
            if (gender == 'female') {
                ClCr = 0.85 * ClCr;
            }
            ClCr = Math.round(ClCr);

            var Vd = randNormal((0.24 * weight), (0.02 * weight), 1);

            var halflife = 0.693 / (0.00285 * ClCr + 0.015);
            halflife = randNormal(halflife, 0.5, 2);

            var k = 0.693 / halflife;
            k = Math.round(k * 1000) / 1000;
            return {
                k: k,
                Vd: Vd,
                halflife: halflife,
                ClCr: ClCr
            };


        };

    });
;




