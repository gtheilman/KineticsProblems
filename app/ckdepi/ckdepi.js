'use strict';

angular.module('kinetics-problems.ckdepi', ['ngRoute', 'n3-line-chart'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/ckdepi', {
            templateUrl: 'ckdepi/ckdepi.html',
            controller: 'ckdepiCtrl'
        });
    }])

    .controller('ckdepiCtrl', function ($scope, LatexService, CreatePatient, PopulationParams, Problem,
                                        AddDisease, AddDrug, SolverService) {
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
        $scope.adultpatient.creatinine = randNormal(2, 1, 1);
        if ($scope.adultpatient.creatinine < 0.1) {
            $scope.adultpatient.creatinine = 0.2;
        }
        $scope.adultpatient.BUN = randNormal(($scope.adultpatient.creatinine * 10), 3, 0);
        $scope.adultpatient.weight = randNormal($scope.adultpatient.weight + 20, 10, 0)
        $scope.disease = AddDisease.gramNegative();
        $scope.drug = AddDrug.genttobra();
        $scope.PMH = AddDisease.PMH();

        $scope.ckdepiEquation = LatexService.ckdepi("Cl", "creat", "age", "gender", "race");
        $scope.ckdepi = SolverService.ckdepi($scope.adultpatient.creatinine, $scope.adultpatient.age, $scope.adultpatient.gender, $scope.adultpatient.race);

        $scope.ckdepiEquationPatient = LatexService.ckdepi($scope.ckdepi, $scope.adultpatient.creatinine, $scope.adultpatient.age, $scope.adultpatient.gender, $scope.adultpatient.race);


    })
;



