'use strict';

angular.module('kinetics-problems.measuredCrCl', ['ngRoute', 'n3-line-chart'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/measuredCrCl', {
            templateUrl: 'measuredCrCl/measuredCrCl.html',
            controller: 'measuredCrClCtrl'
        });
    }])

    .controller('measuredCrClCtrl', function ($scope, LatexService, CreatePatient, PopulationParams, Problem,
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
        /* age, weight, creatinine, gender */
        $scope.measuredCrClPopulationParams = PopulationParams.aminoglycoside($scope.adultpatient.age, $scope.adultpatient.weight, $scope.adultpatient.creatinine, $scope.adultpatient.gender);
        $scope.Problem = Problem.measuredCrCl($scope.measuredCrClPopulationParams.ClCr, $scope.adultpatient.creatinine, $scope.adultpatient.weight);
        $scope.GFR_Equation = LatexService.LaTeX('GFR\\approx Cl_{Cr}=\\frac{[Urine]}{[Blood]}\\times \\frac{Urine\\; Volume}{time}');

        $scope.GFR_Equation2 = LatexService.LaTeX('Cl_{Cr}\\scriptsize{\\frac{mL}{min}}=\\frac{' + $scope.Problem.UrineCrConc + '\\: \\small{\\frac{mg}{dL}}}{' + $scope.adultpatient.creatinine + '\\small{\\frac{mg}{dL}}}\\times \\frac{' + $scope.Problem.UrineVolume + '\\; mL}{time}');

        $scope.GFR_Equation3 = LatexService.LaTeX('Cl_{Cr}\\scriptsize{\\frac{mL}{min}}=\\frac{' + $scope.Problem.UrineCrConc +
        '\\: \\small{\\frac{mg}{dL}}}{' + $scope.adultpatient.creatinine + '\\small{\\frac{mg}{dL}}}\\times \\frac{' +
        $scope.Problem.UrineVolume + '\\; mL}{' + $scope.Problem.durationUrineCollection + '\\: hours}');

        $scope.GFR_Equation4 = LatexService.LaTeX('\\require{cancel}Cl_{Cr}\\scriptsize{\\frac{mL}{min}}=\\frac{' + $scope.Problem.UrineCrConc +
        '\\: \\small{\\frac{mg}{dL}}}{' + $scope.adultpatient.creatinine + '\\: \\small{\\frac{mg}{dL}}}\\times \\frac{' +
        $scope.Problem.UrineVolume + '\\; mL}{' + $scope.Problem.durationUrineCollection + '\\: hours\\times\\small{\\frac{60\\: minutes}{1\\: hour}}}');


        $scope.GFR_Equation5 = LatexService.LaTeX('\\require{cancel}Cl_{Cr}\\scriptsize{\\frac{mL}{min}}=\\frac{' + $scope.Problem.UrineCrConc +
        '\\: \\cancel{\\small{\\frac{mg}{dL}}}}{' + $scope.adultpatient.creatinine + '\\: \\cancel{\\small{\\frac{mg}{dL}}}}\\times \\frac{' +
        $scope.Problem.UrineVolume + '\\; mL}{' + $scope.Problem.durationUrineCollection +
        '\\: \\cancel{hours}\\times\\small{\\frac{60\\: minutes}{1\\: \\cancel{hour}}}}=\\normalsize{' + $scope.measuredCrClPopulationParams.ClCr +
        '}\\scriptsize{\\frac{mL}{min}}');


    })
;



