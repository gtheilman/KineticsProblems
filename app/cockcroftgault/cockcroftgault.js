'use strict';

angular.module('kinetics-problems.cockcroftgault', ['ngRoute', 'n3-line-chart'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cockcroftgault', {
            templateUrl: 'cockcroftgault/cockcroftgault.html',
            controller: 'cockcroftgaultCtrl'
        });
    }])

    .controller('cockcroftgaultCtrl', function ($scope, LatexService, CreatePatient, PopulationParams, Problem,
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
        $scope.cgEquationMale = LatexService.LaTeX('Cl_{cr}=\\frac{(140-Age)\\cdot Weight}{72\\cdot Creatinine}');
        $scope.cgEquationFemale = LatexService.LaTeX('Cl_{cr}=\\frac{(140-Age)\\cdot Weight}{72\\cdot Creatinine} \\times 0.85');
        $scope.cgEquationAge = LatexService.LaTeX('Cl_{cr}=\\frac{(140-\\textbf{Age})\\cdot Weight}{72\\cdot Creatinine}');
        $scope.cgEquationWeight = LatexService.LaTeX('Cl_{cr}=\\frac{(140-Age)\\cdot \\textbf{Weight}}{72\\cdot Creatinine}');
        $scope.cgEquationCreat = LatexService.LaTeX('Cl_{cr}=\\frac{(140-Age)\\cdot Weight}{72\\cdot \\textbf{Creatinine}}');
        $scope.cgEquationCreat = LatexService.LaTeX('Cl_{cr}=\\frac{(140-Age)\\cdot Weight}{72\\cdot \\textbf{Creatinine}}');
        $scope.cgEquationLowOldCreat = LatexService.cockcroftgault(87, 90, 50, 0.4, 1);
        $scope.cgEquationLowOldCreatRounded = LatexService.cockcroftgault(35, 90, 50, 1.0, 1);
        $scope.ibwEquationMale = LatexService.LaTeX('IBW=50kg + (2.3\\times inches>5\\, feet)');
        $scope.ibwEquationAlgebraic = LatexService.LaTeX('IBW=50kg + 2.3(Height-60)');
        $scope.ibwEquationFemale = LatexService.LaTeX('IBW=45.5kg + (2.3\\times inches>5\\, feet)');
        if ($scope.adultpatient.weight / (($scope.adultpatient.height * 0.0254) * ($scope.adultpatient.height * 0.0254) > 30 )) {
            $scope.ibw = SolverService.ibw($scope.adultpatient.height, $scope.adultpatient.gender);
        } else {
            $scope.ibw = adultpatient.weight;
        }
        $scope.ibwEquationPatient = LatexService.ibw($scope.ibw, $scope.adultpatient.height, $scope.adultpatient.gender);

        $scope.CG = Math.round((140 - $scope.adultpatient.age) * $scope.ibw / 72 / $scope.adultpatient.creatinine);
        $scope.cgEquationPatient = LatexService.cockcroftgault($scope.CG, $scope.adultpatient.age, $scope.ibw, $scope.adultpatient.creatinine, 1);

        if ($scope.adultpatient.gender == 'female') {
            $scope.CG = Math.round($scope.CG * 0.85);
            $scope.cgEquationPatient = LatexService.cockcroftgault($scope.CG, $scope.adultpatient.age, $scope.ibw, $scope.adultpatient.creatinine, 0);
        }


        /* age, weight, creatinine, gender
         $scope.cockcroftgaultPopulationParams = PopulationParams.aminoglycoside($scope.adultpatient.age, $scope.adultpatient.weight, $scope.adultpatient.creatinine, $scope.adultpatient.gender);
         $scope.Problem = Problem.cockcroftgault($scope.cockcroftgaultPopulationParams.ClCr, $scope.adultpatient.creatinine, $scope.adultpatient.weight);
         */
    })
;



