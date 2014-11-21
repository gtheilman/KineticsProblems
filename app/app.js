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





// Declare app level module which depends on views, and components
angular.module('kinetics-problems', [
    'ngRoute',
    'kinetics-problems.menu',
    'kinetics-problems.case',
    'kinetics-problems.version',
    'ui.bootstrap'

])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/menu'});
    }])


    .service('GraphService', function () {
        this.concTime = function (units, drug) {
            var graphOptions = {
                axes: {
                    x: {key: 'x', type: 'date'},
                    y: {type: 'linear', min: 0, max: 10, ticks: 5}
                },
                series: [
                    {y: 'value', color: 'steelblue', thickness: '2px', type: 'log', label: drug, dotSize: 5}
                ],
                tooltip: {
                    mode: 'scrubber',
                    formatter: function (x, y, series) {
                        return moment(x).format("HH:mm") + ', ' + y + ' ' + units;
                    }
                },
                lineMode: 'cardinal',
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
            return "\\[-" + k + " = {\\frac{{\\ln " + C + " - \\ln " + C0 + "}}{\\Delta " + t + "}} \\]";
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
            height = Math.round(height * 10) / 10;
            weight = randLab(weight * 0.9, weight * 1.1);
            weight = Math.round(weight);

            var age = randrange(18, 85);

            var races = [
                "white",
                "African-American",
                "Asian",
                "Hispanic"
            ];
            var race = races[randrange(0, (races.length - 1))];

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
            var resp = randrange(15, 30);
            var diagnoses = [
                "sepsis",
                "pneumonia"
            ];
            var diagnosis = diagnoses[randrange(0, (diagnoses.length - 1))];

            return {
                temp: temp,
                WBC: WBC,
                resp: resp,
                diagnosis: diagnosis
            };
        };
    })


    .service('AddDrug', function () {
        this.genttobra = function () {
            var drugs = [
                "gentamicin",
                "tobramycin",
                "netilmicin"
            ];
            var drug = drugs[randrange(0, (drugs.length - 1))];

            return {
                drug: drug
            };
        };
        this.amikacinkanamycin = function () {
            var drugs = [
                "amikacin",
                "kanamycin"
            ];
            var drug = drugs[randrange(0, (drugs.length - 1))];

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




