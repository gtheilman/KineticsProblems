// JavaScript source code


$(document).ready(function () {

    // Initialization 					   
    var mode = $.cookie('mode');

    $("#yTypeSwitch").buttonset();

    if (mode == null) {
        $.cookie('mode', 'K_Unknown');
        mode = $.cookie('mode');
    }

    $('#k').removeClass("inactive").addClass("active");
    $('#C').removeClass("inactive").addClass("active");
    $('#C0').removeClass("inactive").addClass("active");
    $('#time').removeClass("inactive").addClass("active");
    $('#K_Unknown').removeClass("activebutton").addClass("inactivebutton");
    $('#C0_Unknown').removeClass("activebutton").addClass("inactivebutton");
    $('#C_Unknown').removeClass("activebutton").addClass("inactivebutton");
    $('#time_Unknown').removeClass("activebutton").addClass("inactivebutton");
    $('#sliders').removeClass("activebutton").addClass("inactivebutton");
    $('#variable_inputs').hide();
    $('#equation_equations').hide();
    $('#sliderControls').hide();

    if (mode == "K_Unknown") {
        $('#k').removeClass("active").addClass("inactive");
        $('#K_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#variable_inputs').show();
        $('#equation_equations').show();
    }
    else if (mode == "C_Unknown") {
        $('#C').removeClass("active").addClass("inactive");
        $('#C_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#variable_inputs').show();
        $('#equation_equations').show();
    }
    else if (mode == "C0_Unknown") {
        $('#C0').removeClass("active").addClass("inactive");
        $('#C0_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#variable_inputs').show();
        $('#equation_equations').show();
    }
    else if (mode == "time_Unknown") {
        $('#time').removeClass("active").addClass("inactive");
        $('#time_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#variable_inputs').show();
        $('#equation_equations').show();
    }
    else if (mode == "sliders") {
        $('#sliderControls').show();
        $('#sliders').removeClass("inactivebutton").addClass("activebutton");
    }


    //End Initialization


    function create() {
        chart = new Highcharts.Chart(options);
    }

    function updateEquation() {
        mode = $.cookie('mode');
        var outputmiddle = "";
        var output2 = "";
        var output = "";
        var outputmiddle2 = "";

        if (mode != "sliders") {

            if (mode == "K_Unknown") {
                outputmiddle = "\\[" + $("#C").val() + "=" + $("#C0").val() + "\\cdot e^{-" + "k_{el}" + "\\cdot " + $("#time").val() + "} \\]";
                output2 = "\\[-" + $("#k").val() + "= {\\frac{{\\ln " + $("#C").val() + " -\\ln" + $("#C0").val() + "}}{" + $("#time").val() + "}} \\]";
                output = "\\[" + $("#C").val() + "=" + $("#C0").val() + "\\cdot e^{-" + $("#k").val() + "\\cdot " + $("#time").val() + "} \\]";
                outputmiddle2 = "\\[-" + "k_{el}" + "= {\\frac{{\\ln" + $("#C").val() + "-\\ln" + $("#C0").val() + "}}{  " + $("#time").val() + "}} \\]";
            }

            else if (mode == "C_Unknown") {
                outputmiddle = "\\[C=" + $("#C0").val() + "\\cdot e^{-" + $("#k").val() + "\\cdot " + $("#time").val() + "} \\]";
                output = "\\[" + $("#C").val() + "=" + $("#C0").val() + "\\cdot e^{-" + $("#k").val() + "\\cdot " + $("#time").val() + "} \\]";
                outputmiddle2 = "\\[-" + $("#k").val() + "= {\\frac{{\\ln C -\\ln" + $("#C0").val() + "}}{  " + $("#time").val() + "}} \\]";
                output2 = "\\[-" + $("#k").val() + "= {\\frac{{\\ln " + $("#C").val() + " -\\ln" + $("#C0").val() + "}}{" + $("#time").val() + "}} \\]";
            }

            else if (mode == "C0_Unknown") {
                outputmiddle = "\\[" + $("#C").val() + "=" + "C_0" + "\\cdot e^{-" + $("#k").val() + "\\cdot " + $("#time").val() + "} \\]";
                output = "\\[" + $("#C").val() + "=" + $("#C0").val() + "\\cdot e^{-" + $("#k").val() + "\\cdot " + $("#time").val() + "} \\]";
                outputmiddle2 = "\\[-" + $("#k").val() + "= {\\frac{{\\ln" + $("#C").val() + " - \\ln C_0}}{  " + $("#time").val() + "}} \\]";
                output2 = "\\[-" + $("#k").val() + "= {\\frac{{\\ln " + $("#C").val() + " -\\ln" + $("#C0").val() + "}}{" + $("#time").val() + "}} \\]"
            }

            else if (mode == "time_Unknown") {
                outputmiddle = "\\[" + $("#C").val() + "=" + $("#C0").val() + "\\cdot e^{-" + $("#k").val() + "\\cdot " + "t" + "} \\]";
                output = "\\[" + $("#C").val() + "=" + $("#C0").val() + "\\cdot e^{-" + $("#k").val() + "\\cdot " + $("#time").val() + "} \\]";
                outputmiddle2 = "\\[-" + $("#k").val() + "= {\\frac{{\\ln" + $("#C").val() + " - \\ln" + $("#C0").val() + "}}{  " + "t" + "}} \\]";
                output2 = "\\[-" + $("#k").val() + "= {\\frac{{\\ln " + $("#C").val() + " -\\ln" + $("#C0").val() + "}}{" + $("#time").val() + "}} \\]";
            }

            $("#equationmiddle").text(outputmiddle);
            $("#equation").text(output);
            $("#equationmiddle2").text(outputmiddle2);
            $("#equation2").text(output2);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

        }

        else if (mode == "sliders") {
            output = "\\[C=" + $("#C0").val() + "\\cdot e^{-" + $("#k").val() + "\\cdot t} \\]";
            output2 = "\\[-" + $("#k").val() + "= {\\frac{{\\ln C -" + $("#C0").val() + "}}{\\Delta  t}} \\]";
            $("#sliderequation").text(output);
            $("#sliderequation2").text(output2);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "sliderequation"]);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "sliderequation2"]);

        }

    }


    // MathJax.Hub.Queue(["Typeset",MathJax.Hub]);


    function updateChart() {
        mode = $.cookie('mode');
        var chartData = [];

        var C0;
        C0 = Number($('#C0').val());
        if (isNaN(C0)) {
            C0 = 8;
        }
        C0 = Math.round(C0 * 10) / 10;

        var C;
        C = Number($('#C').val());
        if (isNaN(C)) {
            C = 4;
        }
        C = Math.round(C * 10) / 10;

        var Ctime;
        Ctime = Number($('#time').val());
        if (isNaN(Ctime)) {
            Ctime = 1;
        }
        Ctime = Math.round(Ctime * 10) / 10;

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


        if (mode == "C_Unknown") {
            C = C0 * (Math.exp(-1 * k * Ctime));
            C = Math.round(C * 10) / 10;
        }
        else if (mode == "K_Unknown") {
            k = (Math.log(C / C0)) / Ctime * (-1);
            k = Math.round(k * 1000) / 1000;
        }
        else if (mode == "C0_Unknown") {
            C0 = C / (Math.exp(-1 * k * Ctime));
            C0 = Math.round(C0 * 10) / 10;
        }
        else if (mode == "time_Unknown") {
            Ctime = (Math.log(C / C0)) / k * (-1);
            if (isNaN(Ctime)) {
                Ctime = 1;
            }
            Ctime = Math.round(Ctime * 10) / 10;
        }


        var trounded = 0;

        for (var t = 0; t < hrs; t = t + 0.1) {
            trounded = Math.round(t * 10) / 10;

            if (t == 0) {

                chartData.push({
                    x: t,
                    y: C0 * (Math.exp(-1 * k * t)),
                    marker: {
                        symbol: 'url(img/c0_25.png)'
                    }
                });
            }

            else if (trounded == Ctime) {
                chartData.push({
                    x: t,
                    y: C0 * (Math.exp(-1 * k * t)),
                    marker: {
                        symbol: 'url(img/c_25.png)'
                    },
                });
                var yValue = C0 * (Math.exp(-1 * k * t));
                yValue = Math.round(yValue * 10) / 10

            }


            else {

                chartData.push({
                    x: t,
                    y: C0 * (Math.exp(-1 * k * t)),
                    marker: {
                        symbol: 'circle'
                    },
                });

            }
            $('#k').val(k);
            if (isNaN(yValue)) {
                $('#C').val(C0);
            }
            else {
                $('#C').val(yValue);
            }
            $('#C0').val(C0);
            $('#time').val(Ctime);


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

    $('#K_Unknown').click(function () {
        $.cookie('mode', 'K_Unknown');
        $('#variable_inputs').show();
        $('#equation_equations').show();
        $('#sliderControls').hide();
        $('#k').removeClass("active").addClass("inactive");
        $('#C').removeClass("inactive").addClass("active");
        $('#C0').removeClass("inactive").addClass("active");
        $('#time').removeClass("inactive").addClass("active");
        $('#K_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#C0_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#C_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#time_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#sliders').removeClass("activebutton").addClass("inactivebutton");

        create();
        updateChart();
        updateEquation();
    });


    $('#C_Unknown').click(function () {
        $.cookie('mode', 'C_Unknown');
        $('#variable_inputs').show();
        $('#equation_equations').show();
        $('#sliderControls').hide();
        $('#k').removeClass("inactive").addClass("active");
        $('#C').removeClass("active").addClass("inactive");
        $('#C0').removeClass("inactive").addClass("active");
        $('#time').removeClass("inactive").addClass("active");
        $('#K_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#C0_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#C_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#time_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#sliders').removeClass("activebutton").addClass("inactivebutton");
        create();
        updateChart();
        updateEquation();
    });

    $('#C0_Unknown').click(function () {
        $.cookie('mode', 'C0_Unknown');
        $('#variable_inputs').show();
        $('#equation_equations').show();
        $('#sliderControls').hide();
        $('#k').removeClass("inactive").addClass("active");
        $('#C').removeClass("inactive").addClass("active");
        $('#C0').removeClass("active").addClass("inactive");
        $('#time').removeClass("inactive").addClass("active");
        $('#K_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#C0_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#C_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#time_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#sliders').removeClass("activebutton").addClass("inactivebutton");
        create();
        updateChart();
        updateEquation();
    });


    $('#time_Unknown').click(function () {
        $.cookie('mode', 'time_Unknown');
        $('#variable_inputs').show();
        $('#equation_equations').show();
        $('#sliderControls').hide();
        $('#k').removeClass("inactive").addClass("active");
        $('#C').removeClass("inactive").addClass("active");
        $('#C0').removeClass("inactive").addClass("active");
        $('#time').removeClass("active").addClass("inactive");
        $('#K_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#C0_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#C_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#time_Unknown').removeClass("inactivebutton").addClass("activebutton");
        $('#sliders').removeClass("activebutton").addClass("inactivebutton");
        create();
        updateChart();
        updateEquation();
    });


    $('#sliders').click(function () {
        $.cookie('mode', 'sliders');
        $('#variable_inputs').hide();
        $('#equation_equations').hide();
        $('#sliderControls').show();
        $('#K_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#C0_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#C_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#time_Unknown').removeClass("activebutton").addClass("inactivebutton");
        $('#sliders').removeClass("inactivebutton").addClass("activebutton");
        create();
        updateChart();
        updateEquation();
    });


    // What is this?
    // sliderControls


    $('#k').change(function () {
        updateChart();
        updateEquation();
    });


    $('#C0').change(function () {
        updateChart();
        updateEquation();
    });


    $('#C').change(function () {
        updateChart();
        updateEquation();
    });


    $('#time').change(function () {
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
            text: 'First Order Elimination',
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
 


 
 
 
 
 
 
 
 