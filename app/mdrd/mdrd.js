'use strict';

angular.module('kinetics-problems.mdrd', ['ngRoute', 'n3-line-chart'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mdrd', {
            templateUrl: 'mdrd/mdrd.html',
            controller: 'mdrdCtrl'
        });
    }])

    .controller('mdrdCtrl', function ($scope, LatexService, CreatePatient, PopulationParams, Problem,
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

        $scope.mdrdFourFactor = LatexService.mdrd("Cl", "creat", "age", "gender", "race", "", "");
        $scope.mdrdFourFactorOriginal = LatexService.LaTeX('eGFR=186\\times Serum\\, Creatinine ^{^{-1.154}}\\times Age^{-0.203}\\times [1.210\\, if\\, black]\\times [0.742\\, if\\, female]');
        $scope.mdrdSixFactor = LatexService.mdrd("Cl", "creat", "age", "gender", "race", "BUN", "albumin");

        $scope.mdrd = SolverService.mdrd($scope.adultpatient.creatinine, $scope.adultpatient.age, $scope.adultpatient.gender, $scope.adultpatient.race);

        // $scope.mdrdFourFactorPatient = LatexService.mdrd($scope.mdrd, $scope.adultpatient.creatinine, $scope.adultpatient.age,  $scope.adultpatient.gender, $scope.adultpatient.race, "", "");

        $scope.mdrdFourFactorPatient = LatexService.mdrd($scope.mdrd, $scope.adultpatient.creatinine, $scope.adultpatient.age, $scope.adultpatient.gender, $scope.adultpatient.race, "", "");

    })
;



