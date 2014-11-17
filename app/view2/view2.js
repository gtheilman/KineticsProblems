'use strict';



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

    .service('LatexService', function () {
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


    .controller('View2Ctrl', function ($scope, LatexService, GentVariableService) {
        var constants = GentVariableService.C_unknown();
        console.log(constants);
        $scope.firstorder = LatexService.firstOrderElimination(constants.C, constants.C0, constants.k, 't');
        /* (C, C0, k, t )*/
        $scope.firstorderslope = LatexService.firstOrderSlope(2, 10, "k", "t");
        /* (C, C0, k, t )*/


    });



