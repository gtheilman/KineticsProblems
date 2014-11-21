'use strict';

// Declare app level module which depends on views, and components
angular.module('kinetics-problems', [
    'ngRoute',
    'kinetics-problems.menu',
    'kinetics-problems.case',
    'kinetics-problems.version',
    'ui.bootstrap'

])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/menu'});
    }]);
