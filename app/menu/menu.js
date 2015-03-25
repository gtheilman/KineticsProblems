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
                        },
                        {
                            "title": "Sandbox",
                            "url": "sandboxFirstOrder"
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
                            "url": "cockcroftgault"
                        },
                        {
                            "title": "Estimating GFR with MDRD",
                            "url": "mdrd"
                        },
                        {
                            "title": "Estimating GFR with CKD-EPI",
                            "url": "ckdepi"
                        },

                        {
                            "title": "Sandbox",
                            "url": "sandboxGFR"
                        }
                    ]
                },
                {
                    "name": "Intermittent Infusion",
                    "problems": [
                        // {
                        //     "title": "Volume of Distribution Population Estimates",
                        //    "url": "VdPop"
                        //  },
                        // {
                        //    "title": "Calculating a Patient's Actual Volume of Distribution",
                        //    "url": "VdCalc"
                        //  },
                        {
                            "title": "Sandbox",
                            "url": "sandboxSteadyState"
                        }
                    ]
                },
                {
                    "name": "Theophylline",
                    "problems": [

                        {
                            "title": "Sandbox",
                            "url": "sandboxTheophylline"
                        }

                    ]
                },

                {
                    "name": "Digoxin",
                    "problems": [

                        {
                            "title": "Sandbox",
                            "url": "sandboxDigoxin"
                        }

                    ]
                },

                {
                    "name": "Phenytoin",
                    "problems": [

                        {
                            "title": "Sandbox",
                            "url": "sandboxMM"
                        }

                    ]
                }

            ]
    });
