'use strict';



// Declare app level module which depends on views, and components
angular.module('kinetics-problems', [
    'ngRoute',
    'kinetics-problems.menu',
    'kinetics-problems.kel',
    'kinetics-problems.case',
    'kinetics-problems.firstOrderPredict',
    'kinetics-problems.version',
    'ui.bootstrap'

])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/menu'});
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

        this.firstOrderElimination = function (C, C0, k, t) {
            var Variables = checkVariables(C, C0, k, t);
            return "\\[ " + Variables.C + "=" + Variables.C0 + "\\cdot e^{-" + Variables.k + "\\cdot " + Variables.t + "} \\]";
        };
        this.firstOrderSlope = function (C, C0, k, t) {
            var Variables = checkVariables(C, C0, k, t);
            return "\\[-" + Variables.k + " = {\\frac{{\\ln " + Variables.C + " - \\ln " + Variables.C0 + "}}{" + Variables.t + "}} \\]";
        };
        this.LaTeX = function (str) {
            return "\\[" + str + "\\]";
        };
    })

    .service('SolverService', function () {
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
    })


    .service('CreatePatient', function () {
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
            ;

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
                platelets: platelets
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




