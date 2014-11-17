'use strict';

MathJax.Hub.Config({skipStartupTypeset: true});
MathJax.Hub.Configured();


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
        this.firstOrderElimination = function () {
            return "\\[ C=C_0\\cdot e^{-k_{el}\\cdot t} \\]";
        };
    })


    .
    controller('View2Ctrl', function ($scope, LatexService) {

        var firstnumber = 21;
        $scope.CKDEPI = "\\[    GFR \\approx ClCr \\approx" + firstnumber + "\\times SrCr^{-1.154}\\times Age^{-0.203}\\times [1.210 \\; if \\; Black] \\times [0.742 \\; if \\; female]     \\]";
        $scope.child = "\\[    GFR \\approx ClCr \\approx  \\frac{k\\times Height}{SrCr}    \\]";
        $scope.firstorder = LatexService.firstOrderElimination();


    });



