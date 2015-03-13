'use strict';

angular.module('kinetics-problems.gfrchildren', ['ngRoute', 'n3-line-chart'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/gfrchildren', {
            templateUrl: 'gfrchildren/gfrchildren.html',
            controller: 'gfrchildrenCtrl'
        });
    }])

    .controller('gfrchildrenCtrl', function ($scope, LatexService, CreatePatient, PopulationParams, Problem,
                                             AddDisease, AddDrug, SolverService) {
        $scope.Problem = [];
        $scope.pediatricpatient = [];
        $scope.drug = [];
        $scope.PMH = [];
        $scope.PopulationParams = [];
        $scope.steps = [];


        $scope.hidePatient = false;
        $scope.hideStep1 = true;
        $scope.hideStep2 = true;
        $scope.hideStep3 = true;
        $scope.hideStep4 = true;
        $scope.hideStep5 = true;


        $scope.pediatricpatient = CreatePatient.pediatric();
        $scope.pediatricpatient.creatinine = randNormal(2, 1, 1);
        if ($scope.pediatricpatient.creatinine < 0.1) {
            $scope.pediatricpatient.creatinine = 0.2;
        }
        $scope.pediatricpatient.BUN = randNormal(($scope.pediatricpatient.creatinine * 10), 3, 0);
        $scope.pediatricpatient.weight = randNormal($scope.pediatricpatient.weight + 20, 10, 0)
        $scope.disease = AddDisease.gramNegative();
        $scope.drug = AddDrug.genttobra();
        $scope.PMH = AddDisease.PMH();


    })
;



