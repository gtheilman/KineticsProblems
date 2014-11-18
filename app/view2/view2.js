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


angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
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


    .controller('View2Ctrl', function ($scope, LatexService, GentVariableService, CreatePatient, PopulationParams) {
        var constants = GentVariableService.C_unknown();
        console.log(constants);
        /* (C, C0, k, t )*/
        $scope.firstorder = LatexService.firstOrderElimination(constants.C, constants.C0, constants.k, 't');
        /* (C, C0, k, t )*/
        $scope.firstorderslope = LatexService.firstOrderSlope(2, 10, "k", "t");
        $scope.adultpatient = CreatePatient.adult();

        /* age, weight, creatinine, gender */
        $scope.gentParams = PopulationParams.aminoglycoside($scope.adultpatient.age, $scope.adultpatient.weight, $scope.adultpatient.creatinine, $scope.adultpatient.gender);
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

    .service('GentVariableService', function () {
        this.C_unknown = function () {
            var RandomC = Math.floor((Math.random() * 4) + 1);
            var RandomC0 = Math.floor((Math.random() * 8) + RandomC);
            var RandomHalfLife = Math.floor((Math.random() * 5) + 1);
            var RandomK = Math.round(0.693 / RandomHalfLife * 1000) / 1000;
            var RandomT = Math.floor((Math.random() * 10) + 1);
            var C = RandomC0 * (Math.exp(-1 * RandomK * RandomT));
            C = Math.round(C * 10) / 10;
            return {
                C: C,
                C0: RandomC0,
                k: RandomK,
                t: RandomT
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

            var kel = 0.00285 * ClCr + 0.015;
            kel = randLab((kel * 0.8), (kel * 1.2));
            kel = Math.round(kel * 1000) / 1000;

            var halflife = 0.693 / kel;
            halflife = Math.round(halflife * 10) / 10;
            return {
                kel: kel,
                Vd: Vd,
                halflife: halflife,
                ClCr: ClCr
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
    });



