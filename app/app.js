'use strict';


function randrange(minimum, maximum) {
    /* Comes up with a integer value within a range */
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function randLab(lower, upper) {
    /* Comes up with a random lab value of mean +/- random value */
    var labMean = (lower + upper) / 2;
    var labRange = upper - lower;
    var randLab = 0;
    if (randrange(0, 10) <= 5) {
        randLab = labMean + Math.random() * labRange / 2;
    } else {
        randLab = labMean - Math.random() * labRange / 2;
    }
    return randLab
}

function randSelect(list) {
    return list[randrange(0, (list.length - 1))];
}


// Declare app level module which depends on views, and components
angular.module('kinetics-problems', [
    'ngRoute',
    'kinetics-problems.menu',
    'kinetics-problems.kel',
    'kinetics-problems.case',
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
        this.firstOrderElimination = function (C, C0, k, t) {
            if (!angular.isNumber(C)) {
                C = "C";
            }
            if (!angular.isNumber(C0)) {
                C0 = "C_0";
            }
            if (!angular.isNumber(k)) {
                k = "k_{el}";
            }
            if (!angular.isNumber(t)) {
                t = "t";
            }
            return "\\[ " + C + "=" + C0 + "\\cdot e^{-" + k + "\\cdot " + t + "} \\]";

        };
        this.firstOrderSlope = function (C, C0, k, t) {
            if (!angular.isNumber(C)) {
                C = "C";
            } else {
                C = C + "\\frac{mg}{L}"
            }
            if (!angular.isNumber(C0)) {
                C0 = "C_0";
            } else {
                C0 = C0 + "\\frac{mg}{L}"
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
            return "\\[-" + k + " = {\\frac{{\\ln " + C + " - \\ln " + C0 + "}}{" + t + "}} \\]";
        };
        this.kelSolution = function (k) {
            return "\\[k_{el} = -" + k + " \\:  hrs^{-1}\\]";
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
                var height = randLab(65, 75);
                var weight = 50 + 2.3 * (height - 60);
            } else {
                var gender = 'female';
                var height = randLab(62, 72);
                var weight = 45.5 + 2.3 * (height - 60);
            }
            height = Math.round(height);
            weight = randLab(weight * 0.9, weight * 1.1);
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
            var Na = Math.floor(randLab(136, 146));
            var K = Math.floor(randLab(3.5, 5.1) * 10) / 10;
            var Cl = Math.floor(randLab(98, 108));
            var C02 = Math.floor(randLab(18, 30));
            var glucose = Math.floor(randLab(74, 106));

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
                C02: C02,
                glucose: glucose,
                height: height,
                weight: weight
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
            return {
                temp: temp,
                WBC: WBC,
                resp: resp,
                diagnosis: diagnosis,
                hr: hr
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
        this.aminoglycoside = function (age, weight, Scr, gender) {
            var ClCr = (140 - age) * weight / 72 / Scr;
            if (gender == 'female') {
                ClCr = 0.85 * ClCr;
            }
            ClCr = Math.round(ClCr);

            var Vd = randLab((0.21 * weight), (0.27 * weight));
            Vd = Math.round(Vd * 10) / 10;

            var k = 0.00285 * ClCr + 0.015;
            k = randLab((k * 0.8), (k * 1.2));
            k = Math.round(k * 1000) / 1000;

            var halflife = 0.693 / k;
            halflife = Math.round(halflife * 10) / 10;
            return {
                k: k,
                Vd: Vd,
                halflife: halflife,
                ClCr: ClCr
            };


        };
    });




