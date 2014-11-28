// JavaScript source code


$(document).ready(function () {

    // Initialization 					   
    var mode = $.cookie('mode');

    $("#yTypeSwitch").buttonset();

    if (mode == null) {
        $.cookie('mode', 'dose_Unknown');
        mode = $.cookie('mode');
    }

    $('#Vd').removeClass("inactive").addClass("active");
    $('#C').removeClass("inactive").addClass("active");
    $('#C0').removeClass("inactive").addClass("active");
    $('#time').removeClass("inactive").addClass("active");
    $('#Vd_Unknown').removeClass("activebutton").addClass("inactivebutton");
    $('#C_Unknown').removeClass("activebutton").addClass("inactivebutton");
    $('#loadingdose').removeClass("activebutton").addClass("inactivebutton");
    $('#dose_Unknown').removeClass("activebutton").addClass("inactivebutton");
    $('#multidose').removeClass("activebutton").addClass("inactivebutton");
    $('#variable_inputs').show();
    $('#equation_equations').show();
    $('#sliderControls').hide();


    if (mode == "Vd_Unknown") {
        $('#Vd').removeClass("active").addClass("inactive");
        $('#Vd_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#variable_inputs').show();
        $('#equation_equations').show();
    }
    else if (mode == "C_Unknown") {
        $('#C').removeClass("active").addClass("inactive");
        $('#C_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#variable_inputs').show();
        $('#equation_equations').show();
    }
    else if (mode == "dose_Unknown") {
        $('#Dose').removeClass("active").addClass("inactive");
        $('#dose_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#variable_inputs').show();
        $('#equation_equations').show();
    }


    else if (mode == "loadingdose") {
        $('#loadingdose').removeClass("inactivebutton").addClass("activebutton");
        $('.notMultidose').hide();
    }


    else if (mode == "multidose") {
        $('#multidose').removeClass("inactivebutton").addClass("activebutton");
        $('.notMultidose').hide();
    }

    else if (mode == "loadingdose") {
        $('#loadingdose').removeClass("inactivebutton").addClass("activebutton");
        $('.notMultidose').hide();
    }


    //End Initialization


    function create() {
        chart = new Highcharts.Chart(options);
    }

    function updateEquation() {
        mode = $.cookie('mode');
        if (mode == 'multidose') {
            var output = "\\[ C=\\frac{\\frac{Dose}{t_{inf}}}{V_{d}\\cdot k_{el}}\\cdot  \\frac{(1-e^{-k_{el}\\cdot  t_{inf}})}{(1-e^{-k_{el}\\cdot  \\tau })}  \\cdot   {(1-e^{-nk_{el}\\cdot \\tau })}   \\cdot            e^{-k{_{el}\\cdot  t_{wait}}} \\]";
            var output2 = "\\[C=\\frac{\\frac{" + $('#Dose').val() + "}{" + $('#tinf').val() + "}}{" + $('#Vd').val() + "\\cdot " + $('#k').val() + "}\\cdot  \\frac{(1-e^{-" + $('#k').val() + "\\cdot " + $('#tinf').val() + "})}{(1-e^{-" + $('#k').val() + "\\cdot" + "\\\\" + $('#tau').val() + "})}       \\cdot   {(1-e^{-n" + $('#k').val() + "\\cdot  " + $('#tau').val() + " })}   \\cdot                                e^{-" + $('#k').val() + "\\cdot  " + $('#twait').val() + "} \\]";
        }
        else if (mode == 'loadingdose') {
            var output2 = "\\[" + $('#C').val() + "=\\frac{\\frac{" + $('#Dose').val() + "}{" + $('#tinf').val() + "}}{" + $('#Vd').val() + "\\cdot " + $('#k').val() + "}\\cdot  {(1-e^{-" + $('#k').val() + "\\cdot  " + $('#tinf').val() + "})} \\]";
            var output = "\\[ C=\\frac{\\frac{Dose}{t_{inf}}}{V_{d}\\cdot k_{el}}\\cdot  {(1-e^{-k_{el}\\cdot  t_{inf}})}  \\]";
        } else {
            var output = "\\[ C=\\frac{\\frac{Dose}{t_{inf}}}{V_{d}\\cdot k_{el}}\\cdot  \\frac{(1-e^{-k_{el}\\cdot  t_{inf}})}{(1-e^{-k_{el}\\cdot  \\tau })}  \\cdot          e^{-k{_{el}\\cdot  t_{wait}}} \\]";
            var output2 = "\\[" + $('#C').val() + "=\\frac{\\frac{" + $('#Dose').val() + "}{" + $('#tinf').val() + "}}{" + $('#Vd').val() + "\\cdot " + $('#k').val() + "}\\cdot  \\frac{(1-e^{-" + $('#k').val() + "\\cdot  " + $('#tinf').val() + "})}{(1-e^{-" + $('#k').val() + "\\cdot " + "\\\\" + $('#tau').val() + "})}e^{-" + $('#k').val() + "\\cdot  " + $('#twait').val() + "} \\]";

        }

        $("#equation").text(output);
        $("#equationSolved").text(output2);

        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

    }

    function updateChart() {
        mode = $.cookie('mode');
        var chartData = [];

        var Dose;
        Dose = Number($('#Dose').val());
        if (isNaN(Dose)) {
            Dose = 150;
        }
        Dose = Math.round(Dose);

        var tinf;
        tinf = Number($('#tinf').val());
        if (isNaN(tinf)) {
            tinf = 1;
        }
        tinf = Math.round(tinf * 10) / 10;


        var tau;
        tau = Number($('#tau').val());
        if (isNaN(tau)) {
            tau = 8;
        }
        tau = Math.round(tau * 10) / 10;


        var twait;
        twait = Number($('#twait').val());
        if (isNaN(twait)) {
            twait = 8;
        }
        twait = Math.round(twait * 10) / 10;


        var Vd;
        Vd = Number($('#Vd').val());
        if (isNaN(Vd)) {
            Vd = 35;
        }
        Vd = Math.round(Vd * 10) / 10;

        var C;
        C = Number($('#C').val());
        if (isNaN(C)) {
            C = 4;
        }
        C = Math.round(C * 10) / 10;

        var k;
        k = Number($('#k').val());
        if (isNaN(k)) {
            k = 0.693;
        }
        k = Math.round(k * 10000) / 10000;
        if (k == 0) {
            k = 0.001;
        }


        var hrs;
        hrs = Number($('#hrs').val());
        hrs = Math.round(hrs * 10) / 10;
        if (hrs < Ctime) {
            hrs = Ctime + 1;
            $('#hrs').val(Ctime + 1);
        }

        var Ctime;
        Ctime = (twait);
        if (isNaN(Ctime)) {
            Ctime = 1;
        }
        Ctime = Math.round(Ctime * 10) / 10;


        if (mode == "C_Unknown") {
            C = (Dose / tinf) / (Vd * k) * ( (1 - (Math.exp(-1 * k * tinf))) / (1 - (Math.exp(-1 * k * tau))) * (Math.exp(-1 * k * twait)) );
            C = Math.round(C * 10) / 10;
        }
        else if (mode == "dose_Unknown") {
            Dose = tinf * C * Vd * k / ( (1 - (Math.exp(-1 * k * tinf))) / (1 - (Math.exp(-1 * k * tau))) * (Math.exp(-1 * k * twait)) );
            Dose = Math.round(Dose);
        }
        else if (mode == "Vd_Unknown") {
            Vd = (Dose / tinf) / (C * k) * ( (1 - (Math.exp(-1 * k * tinf))) / (1 - (Math.exp(-1 * k * tau))) * (Math.exp(-1 * k * twait)) );
            Vd = Math.round(Vd * 10) / 10;
        }

        var trounded = 0;


        if (mode == 'multidose') {


            if ($("#yTypeSwitch input[type='radio']:checked").val() == 'linear') {
                chartData.push({
                    x: 0,
                    y: 0,
                    marker: {
                        symbol: 'circle'
                    },
                });
            }

            var hrs = (0.693 / k * 6);

            Smax = hrs / tau;

            for (var s = 0; s < Smax; s++) {

                for (var t = tinf; t < tau; t = t + 0.1) {
                    trounded = Math.round(t * 10) / 10;

                    chartData.push({
                        x: (t + (s) * tau),
                        y: ( (Dose / tinf) / (Vd * k) * (1 - (Math.exp(-1 * k * tinf))) / (1 - (Math.exp(-1 * k * tau))) * (1 - (Math.exp(-1 * k * (s + 1) * tau))) * (Math.exp(-1 * k * t))  ),
                        marker: {
                            symbol: 'circle'
                        },
                    });
                }
            }

        }


        else if (mode == 'loadingdose') {


            var twait = 0;

            if ($("#yTypeSwitch input[type='radio']:checked").val() == 'linear') {
                chartData.push({
                    x: 0,
                    y: 0,
                    marker: {
                        symbol: 'circle'
                    },
                });
            }

            var hrs = (tau + 2);


            for (var t = 0.1; t < tau; t = t + 0.1) {
                trounded = Math.round(t * 10) / 10;

                chartData.push({
                    x: t,
                    y: ( (Dose / tinf) / (Vd * k) * (1 - (Math.exp(-1 * k * t)))    ),
                    marker: {
                        symbol: 'circle'
                    },
                });
            }
        }


        else {


            for (var t = 0; t < hrs; t = t + 0.1) {
                trounded = Math.round(t * 10) / 10;

                if (t == 0) {

                    chartData.push({
                        x: t,
                        y: ( (Dose / tinf) / (Vd * k) * (1 - (Math.exp(-1 * k * tinf))) / (1 - (Math.exp(-1 * k * tau))) * (Math.exp(-1 * k * t))  ),
                        marker: {
                            symbol: 'url(img/tinf_25.png)'
                        }
                    });
                }

                else if (trounded == Ctime) {
                    chartData.push({
                        x: t,
                        y: ( (Dose / tinf) / (Vd * k) * (1 - (Math.exp(-1 * k * tinf))) / (1 - (Math.exp(-1 * k * tau))) * (Math.exp(-1 * k * t))  ),
                        marker: {
                            symbol: 'url(img/twait_25.png)'
                        },
                    });
                    var yValue = C0 * (Math.exp(-1 * k * t));
                    yValue = Math.round(yValue * 10) / 10

                }


                else {

                    chartData.push({
                        x: t,
                        y: ( (Dose / tinf) / (Vd * k) * (1 - (Math.exp(-1 * k * tinf))) / (1 - (Math.exp(-1 * k * tau))) * (Math.exp(-1 * k * t))  ),
                        marker: {
                            symbol: 'circle'
                        },
                    });

                }
            }


        }


        $('#Vd').val(Vd);
        $('#Dose').val(Dose);
        $('#tinf').val(tinf);
        $('#twait').val(twait);
        $('#tau').val(tau);
        $('#k').val(k);


        if (isNaN(yValue)) {
            $('#C').val(C);
        }
        else {
            $('#C').val(yValue);
        }


        chart.series[0].setData(chartData);
        //	var Cp = chart.get('Cpoint');
        // Cp.remove();
    }

    // End Update Chart


    // Post-initialization interface (e.g., buttons)
    $('#yTypeSwitch').click(function () {
        chart.destroy();
        options.yAxis.type = $("#yTypeSwitch input[type='radio']:checked").val();
        chart = new Highcharts.Chart(options);
        updateChart();
    });

    $('#Vd_Unknown').click(function () {
        $.cookie('mode', 'Vd_Unknown');
        $('.notMultidose').show();
        $('#variable_inputs').show();
        $('#equation_equations').show();
        $('#sliderControls').hide();
        $('#Vd').removeClass("active").addClass("inactive");
        $('#C').removeClass("inactive").addClass("active");
        $('#Dose').removeClass("inactive").addClass("active");
        $('#Vd_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#C_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#dose_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#loadingdose').removeClass("activebutton").addClass("inactivebutton");
        $('#multidose').removeClass("activebutton").addClass("inactivebutton");

        create();
        updateChart();
        updateEquation();
    });


    $('#C_Unknown').click(function () {
        $.cookie('mode', 'C_Unknown');
        $('.notMultidose').show();
        $('#variable_inputs').show();
        $('#equation_equations').show();
        $('#sliderControls').hide();
        $('#Vd').removeClass("inactive").addClass("active");
        $('#C').removeClass("active").addClass("inactive");
        $('#Dose').removeClass("inactive").addClass("active");
        $('#Vd_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#C_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#dose_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#loadingdose').removeClass("activebutton").addClass("inactivebutton");
        $('#multidose').removeClass("activebutton").addClass("inactivebutton");
        create();
        updateChart();
        updateEquation();
    });


    $('#dose_Unknown').click(function () {
        $.cookie('mode', 'dose_Unknown');
        $('.notMultidose').show();
        $('#variable_inputs').show();
        $('#equation_equations').show();
        $('#sliderControls').hide();
        $('#Vd').removeClass("inactive").addClass("active");
        $('#C').removeClass("inactive").addClass("active");
        $('#Dose').removeClass("active").addClass("inactive");
        $('#Vd_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#C_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#dose_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#loadingdose').removeClass("activebutton").addClass("inactivebutton");
        $('#multidose').removeClass("activebutton").addClass("inactivebutton");
        create();
        updateChart();
        updateEquation();
    });


    $('#loadingdose').click(function () {
        $.cookie('mode', 'loadingdose');
        $('#variable_inputs').show();
        $('#equation_equations').show();
        $('#sliderControls').hide();
        $('#Vd').removeClass("inactive").addClass("active");
        $('#Dose').removeClass("inactive").addClass("active");
        $('#Vd_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#C_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#dose_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#multidose').removeClass("activebutton").addClass("inactivebutton");
        $('#loadingdose').removeClass("inactivebutton").addClass("activebutton");
        $('.notMultidose').hide();
        create();
        updateChart();
        updateEquation();
    });


    $('#multidose').click(function () {
        $.cookie('mode', 'multidose');
        $('#variable_inputs').show();
        $('#equation_equations').show();
        $('#sliderControls').hide();
        $('#Vd').removeClass("inactive").addClass("active");
        $('#Dose').removeClass("inactive").addClass("active");
        $('#Vd_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#C_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#dose_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#loadingdose').removeClass("activebutton").addClass("inactivebutton");
        $('#multidose').removeClass("inactivebutton").addClass("activebutton");
        $('.notMultidose').hide();
        create();
        updateChart();
        updateEquation();
    });


    // What is this?
    // sliderControls


    $('#Vd').change(function () {
        updateChart();
        updateEquation();
    });


    $('#k').change(function () {
        updateChart();
        updateEquation();
    });


    $('#tinf').change(function () {
        updateChart();
        updateEquation();
    });


    $('#tau').change(function () {
        updateChart();
        updateEquation();
    });


    $('#twait').change(function () {
        updateChart();
        updateEquation();
    });


    $('#C').change(function () {
        updateChart();
        updateEquation();
    });


    $('#Dose').change(function () {
        updateChart();
        updateEquation();
    });

    $("#slider-k").slider({
        animate: "fast",
        min: 0.01,
        max: 1,
        step: 0.01,
        value: 0.25,
        change: function (event, ui) {
            updateChart();
        },
        slide: function (event, ui) {
            $("#k").val(ui.value);
            updateEquation();
        }
    });

    $("#k").val($("#slider-k").slider("value"));


    $("#slider-hrs").slider({
        animate: "fast",
        min: 0,
        max: 36,
        step: 0.1,
        value: 8,
        change: function (event, ui) {
            updateChart();
            updateEquation();
        },
        slide: function (event, ui) {
            $("#hrs").val(ui.value);

        }
    });

    $("#hrs").val($("#slider-hrs").slider("value"));


    $("#slider-C0").slider({
        animate: "fast",
        min: 0,
        max: 15,
        step: 0.1,
        value: 8,
        change: function (event, ui) {
            updateChart();
        },
        slide: function (event, ui) {
            $("#C0").val(ui.value);
            updateEquation();
        }
    });
    $("#C0").val($("#slider-C0").slider("value"));


    // Begin Creating Chart					   
    var data = []; // empty data array


    var options = {
        chart: {
            renderTo: 'container',
            events: {
                click: function (e) {
                    mode = $.cookie('mode');
                    // find the clicked values and the series
                    var x = e.xAxis[0].value;
                    y = e.yAxis[0].value;

                    if ((mode != "C_Unknown") && (mode != "time_Unknown")) {
                        C = Math.round(y * 10) / 10;
                        $('#C').val(C);
                        time = Math.round(x * 10) / 10;
                        $('#time').val(time);
                        updateEquation();
                        create();
                        updateChart();
                    }

                    // series = this.series[0];

                    // Add it
                    //  series.addPoint([x, y]);
                }
            }
        },
        title: {
            text: 'Intermittent Infusion at Steady State',
            x: -20 //center
        },
        xAxis: {
            type: 'linear',
            title: {
                text: 'Time (hours)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },

        yAxis: {
            type: $("#yTypeSwitch input[type='radio']:checked").val(),
            title: {
                text: 'Concentration(mg/L)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return 'Conc = ' + parseFloat(Math.round(this.y * 100) / 100).toFixed(1) + ' mg/L at ' + parseFloat(Math.round(this.x * 100) / 100).toFixed(1) + ' hours';
            }
        },
        labels: {
            items: [{
                html: '',
                style: {
                    top: '100px',
                    left: '400px'
                }
            }]
        },

        plotOptions: {
            series: {
                lineWidth: 1,
                animation: {
                    duration: 3000
                },
                point: {
                    events: {
                        'click': function () {
                            if (this.series.data.length > 1)
                                this.select();
                        }
                    }
                }
            }
        },

        series: [{
            showInLegend: false,
            name: 'Concentration(mg/L)',
            data: data
        }]

    };

    // End Create Chart


    // Should be in initialization
    create();
    updateChart();
    updateEquation();
    // Should be in initialization 


});
 
 
 
 


