'use strict';

angular.module('kinetics-problems.menu', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/menu', {
            templateUrl: 'menu/menu.html',
            controller: 'menuCtrl'
        });
    }])

    .controller('menuCtrl', function ($scope) {
        $scope.oneAtATime = false;

        $scope.menugroups =
            [
                {
                    "name": "First-order Elimination",
                    "problems": [
                        {
                            "title": "Solving for the Elimination Rate Constant (Kel)",
                            "url": "kel"
                        },
                        {
                            "title": "Predicting Concentrations of First-order Drugs",
                            "url": "firstOrderPredict"
                        },
                        {
                            "title": "Postdicting Concentrations of First-order Drugs",
                            "url": "firstOrderPostdict"
                        }
                    ]
                },
                {
                    "name": "Quantifying Renal Function",
                    "problems": [
                        {
                            "title": "Measured Creatinine Clearance",
                            "url": "measuredCrCl"
                        },
                        {
                            "title": "Cockroft-Gault",
                            "url": "cockroftGault"
                        },
                        {
                            "title": "MDRD",
                            "url": "mdrd"
                        }
                    ]
                }
            ]
    });
