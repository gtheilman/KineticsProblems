'use strict';


angular.module('kinetics-problems.case', ['ngRoute', 'n3-line-chart'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/case', {
            templateUrl: 'case/case.html',
            controller: 'CaseCtrl'
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


    .controller('CaseCtrl', function ($scope, LatexService, CreatePatient, PopulationParams, SolverService, GraphService, AddDisease, AddDrug) {

        $scope.adultpatient = CreatePatient.adult();
        $scope.disease = AddDisease.gramNegative();
        $scope.drug = AddDrug.genttobra();
        /* age, weight, creatinine, gender */
        $scope.gentParams = PopulationParams.aminoglycoside($scope.adultpatient.age, $scope.adultpatient.weight, $scope.adultpatient.creatinine, $scope.adultpatient.gender);
        /* (C, C0, k, t )*/
        $scope.solver = SolverService.FirstOrderElimination(2, 10, $scope.gentParams.k, 't');
        /* (C, C0, k, t )*/
        $scope.firstorder = LatexService.firstOrderElimination(2, 10, $scope.gentParams.k, $scope.solver.t);
        /* (C, C0, k, t )*/
        $scope.firstorderslope = LatexService.firstOrderSlope(2, 10, "k", "t");


        $scope.data = [
            {x: new Date("October 13, 2014 06:00:00"), value: 0.5, tipLabel: "C"},
            {x: new Date("October 13, 2014 06:30:00"), value: 8, tipLabel: ""},
            {x: new Date("October 13, 2014 07:00:00"), value: 7, tipLabel: "C0"},
            {x: new Date("October 13, 2014 11:00:00"), value: 0.5, tipLabel: "C"}

        ];

        $scope.graphOptions = GraphService.concTime('mg/L', 'gentamicin');

    });





