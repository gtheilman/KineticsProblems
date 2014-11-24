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
                            "title": "Estimating GFR with Cockroft-Gault",
                            "url": "cockroftGault"
                        },
                        {
                            "title": "Estimating GFR with MDRD",
                            "url": "mdrd"
                        }
                    ]
                },
                {
                    "name": "Volume of Distribution",
                    "problems": [
                        {
                            "title": "Volume of Distribution Population Estimates",
                            "url": "VdPop"
                        },
                        {
                            "title": "Calculating a Patient's Actual Volume of Distribution",
                            "url": "VdCalc"
                        }
                    ]
                }
            ]
    });
