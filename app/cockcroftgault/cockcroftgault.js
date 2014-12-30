'use strict';

angular.module('kinetics-problems.cockcroftgault', ['ngRoute', 'n3-line-chart'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cockcroftgault', {
            templateUrl: 'cockcroftgault/cockcroftgault.html',
            controller: 'cockcroftgaultCtrl'
        });
    }])

    .controller('cockcroftgaultCtrl', function ($scope, LatexService, CreatePatient, PopulationParams, Problem,
                                                AddDisease, AddDrug) {
        $scope.Problem = [];
        $scope.adultpatient = [];
        $scope.drug = [];
        $scope.PMH = [];
        $scope.PopulationParams = [];
        $scope.steps = [];
        $scope.initialDrawingData = [];
        $scope.initialDrawingOptions = [];
        $scope.initialDrawingOptionsLog = [];

        $scope.hidePatient = false;
        $scope.hideStep1 = true;
        $scope.hideStep2 = true;
        $scope.hideStep3 = true;
        $scope.hideStep4 = true;
        $scope.hideStep5 = true;


        $scope.adultpatient = CreatePatient.adult();
        $scope.adultpatient.creatinine = randNormal(3, 1, 1)
        $scope.adultpatient.BUN = randNormal(($scope.adultpatient.creatinine * 10), 3, 0);
        $scope.disease = AddDisease.gramNegative();
        $scope.drug = AddDrug.genttobra();
        $scope.PMH = AddDisease.PMH();
        /* age, weight, creatinine, gender
         $scope.cockcroftgaultPopulationParams = PopulationParams.aminoglycoside($scope.adultpatient.age, $scope.adultpatient.weight, $scope.adultpatient.creatinine, $scope.adultpatient.gender);
         $scope.Problem = Problem.cockcroftgault($scope.cockcroftgaultPopulationParams.ClCr, $scope.adultpatient.creatinine, $scope.adultpatient.weight);
         */
    })
;



