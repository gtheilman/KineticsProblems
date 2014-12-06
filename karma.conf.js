module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/n3-line-chart/dist/line-chart.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'app/bower_components/moment/moment.js',
            'app/bower_components/jquery/dist/jquery.js',
            'app/components/**/*.js',
            'app/menu*/**/*.js',
            'app/kel*/**/*.js',
            'app/firstOrderPredict*/**/*.js',
            'app/firstOrderPostdict*/**/*.js',
            'app/measuredCrCl*/**/*.js',
            'app/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
