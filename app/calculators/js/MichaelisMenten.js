// JavaScript source code


function resetButtons() {
    $('#vmaxButton').removeClass("activebutton").addClass("inactivebutton");
    $('#kmButton').removeClass("activebutton").addClass("inactivebutton");
    $('#cssButton').removeClass("activebutton").addClass("inactivebutton");
    $('#doseButton').removeClass("activebutton").addClass("inactivebutton");
    $('#2concButton').removeClass("activebutton").addClass("inactivebutton");
    $('#tSSButton').removeClass("activebutton").addClass("inactivebutton");
    $('#loadButton').removeClass("activebutton").addClass("inactivebutton");
    $('#equation_equations').show();
    $('#vmax_input').show();
    $('#km_input').show();
    $('#css_input').show();
    $('#dose_input').show();
    $('#saltSwitch').show();
    $('#vd_input').hide();
    $('#container').show();
    $('#x1_input').hide();
    $('#x2_input').hide();
    $('#c1_input').hide();
    $('#c2_input').hide();
    initializeEquation();


}


$(function () {
    $("#saltSwitch").buttonset();
});


function initializeEquation() {

    MMmode = $.cookie('MMmode');
    var Equation = "\\[           X{_{d}}\\times S=\\frac{V{_{max}}\\times C_{ss}}{k_{m}+C_{ss}}       \\]";

    if (MMmode == "dose") {
        if ($("#saltSwitch input[type='radio']:checked").val() == "Na") {
            EquationResult = "\\[      X{_{d}}\\times S=\\frac{V{_{max}}\\times C_{ss}}{k_{m}+C_{ss}}     \\]";
        } else {
            EquationResult = "\\[      X{_{d}}\\times S=\\frac{V{_{max}}\\times C_{ss}}{k_{m}+C_{ss}}      \\]";
        }
    }

    else if (MMmode == "vmax") {
        if ($("#saltSwitch input[type='radio']:checked").val() == "Na") {
            EquationResult = "\\[      X{_{d}}\\times S=\\frac{V{_{max}}\\times C_{ss}}{k_{m}+C_{ss}}     \\]";
        } else {
            EquationResult = "\\[      X{_{d}}\\times S=\\frac{V{_{max}}\\times C_{ss}}{k_{m}+C_{ss}}      \\]";
        }
    }

    else if (MMmode == "km") {
        if ($("#saltSwitch input[type='radio']:checked").val() == "Na") {
            EquationResult = "\\[      X{_{d}}\\times S=\\frac{V{_{max}}\\times C_{ss}}{k_{m}+C_{ss}}     \\]";
        } else {
            EquationResult = "\\[      X{_{d}}\\times S=\\frac{V{_{max}}\\times C_{ss}}{k_{m}+C_{ss}}      \\]";
        }
    }

    else if (MMmode == "css") {
        if ($("#saltSwitch input[type='radio']:checked").val() == "Na") {
            EquationResult = "\\[      X{_{d}}\\times S=\\frac{V{_{max}}\\times C_{ss}}{k_{m}+C_{ss}}     \\]";
        } else {
            EquationResult = "\\[      X{_{d}}\\times S=\\frac{V{_{max}}\\times C_{ss}}{k_{m}+C_{ss}}      \\]";
        }
    }

    else if (MMmode == "load") {
        Equation = "\\[         C=\\frac{X_{0}\\times S}{V_{d}}      \\]";
        if ($("#saltSwitch input[type='radio']:checked").val() == "Na") {
            EquationResult = "\\[      C=\\frac{X_{0}\\times S}{V_{d}}      \\]";
        } else {
            EquationResult = "\\[      C=\\frac{X_{0}\\times S}{V_{d}}      \\]";
        }
    }

    else if (MMmode == "tSS") {
        Equation = "\\[        t_{90}=\\frac{k_{m}\\times V_{d}}{(V_{max}-X_{d})^{2}}[(2.3\\times V_{max})-(0.9\\times X_{d})]      \\]";
        EquationResult = "\\[     t_{90}=\\frac{k_{m}\\times V_{d}}{(V_{max}-X_{d})^{2}}[(2.3\\times V_{max})-(0.9\\times X_{d})]       \\]";
    }


    else if (MMmode == "2conc") {
        Equation = "\\[       -k_{m}=\\frac{X_{1}-X_{2}}   {  \\frac{X_{1}}{C_{1}}-\\frac{X_{2}}{C_{2}}  }     \\]";
        EquationResult = "\\[       -k_{m}=\\frac{X_{1}-X_{2}}   {  \\frac{X_{1}}{C_{1}}-\\frac{X_{2}}{C_{2}}  }        \\]";
    }


    $("#Equation").text(Equation);
    $("#EquationResult").text(EquationResult);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);


}


$(document).ready(function () {

    // Initialization 				
    resetButtons();
    var MMmode = $.cookie('MMmode');

    if (MMmode == null) {
        $.cookie('MMmode', 'dose');
        MMmode = $.cookie('MMmode');
    }
    else if (MMmode == '2conc') {
        $.cookie('MMmode', 'dose');
        MMmode = $.cookie('MMmode');
    }


    if (MMmode == "dose") {
        resetButtons();
        $('#doseButton').removeClass("inactivebutton").addClass("activebutton");
        $('#dose_input').hide();
    }

    else if (MMmode == "vmax") {
        resetButtons();
        $('#vmaxButton').removeClass("inactivebutton").addClass("activebutton");
        $('#vmax_input').hide();

    }
    else if (MMmode == "css") {
        resetButtons();
        $('#cssButton').removeClass("inactivebutton").addClass("activebutton");
        $('#css_input').hide();


    }
    else if (MMmode == "km") {
        resetButtons();
        $('#kmButton').removeClass("inactivebutton").addClass("activebutton");
        $('#km_input').hide();
    }
    else if (MMmode == "load") {
        resetButtons();
        $('#loadButton').removeClass("inactivebutton").addClass("activebutton");
        $('#km_input').hide();
        $('#vd_input').show();
        $('#vmax_input').hide();
        $('#container').hide();
    }
    else if (MMmode == "tSS") {
        resetButtons();
        $('#tSSButton').removeClass("inactivebutton").addClass("activebutton");
        $('#km_input').show();
        $('#vd_input').show();
        $('#vmax_input').show();
        $('#css_input').hide();
        $('#saltSwitch').hide();
        $('#container').hide();
    }

    else if (MMmode == "2conc") {
        resetButtons();
        $('#2concButton').removeClass("inactivebutton").addClass("activebutton");
        $('#km_input').hide();
        $('#vd_input').hide();
        $('#vmax_input').hide();
        $('#css_input').hide();
        $('#dose_input').hide();
        $('#x1_input').show();
        $('#x2_input').show();
        $('#c1_input').show();
        $('#c2_input').show();
        $('#saltSwitch').hide();
        $('#container').show();

    }

    //End Initialization


    function create() {
        chart = new Highcharts.Chart(options);
    }


    function updateEquation() {
        MMmode = $.cookie('MMmode');
        var Equation = "";
        var EquationResult = "";
        var km = Number($("#km").val());
        var vmax = Number($("#vmax").val());
        var css = Number($("#css").val());
        var dose = Number($("#dose").val());
        var vd = Number($("#vd").val());
        var t90 = 0;
        var x1 = Number($("#x1").val());
        var x2 = Number($("#x2").val());
        var c1 = Number($("#c1").val());
        var c2 = Number($("#c2").val());


        if (MMmode == "css") {
            $('#cssButton').removeClass("inactivebutton").addClass("activebutton");
            if ($("#saltSwitch input[type='radio']:checked").val() == "Na") {
                css = dose * 0.92 * km / (vmax - dose * 0.92  );
                css = Math.round(css * 10) / 10;
                EquationResult = "\\[    " + dose + "\\times" + 0.92 + "=\\frac{" + vmax + "\\times " + css + "} {" + km + "+" + css + "}     \\]";
            } else {
                css = dose * km / (vmax - dose  );
                css = Math.round(css * 10) / 10;
                EquationResult = "\\[    " + dose + "\\times" + 1 + "=\\frac{" + vmax + "\\times " + css + "} {" + km + "+" + css + "}     \\]";
            }

        }


        else if (MMmode == "dose") {
            $('#doseButton').removeClass("inactivebutton").addClass("activebutton");
            if ($("#saltSwitch input[type='radio']:checked").val() == "Na") {
                dose = (( vmax * css ) / ( km + css )) / 0.92;
                dose = Math.round(dose);
                EquationResult = "\\[    " + dose + "\\times" + 0.92 + "=\\frac{" + vmax + "\\times " + css + "} {" + km + "+" + css + "}     \\]";
            } else {
                dose = (( vmax * css ) / ( km + css ));
                dose = Math.round(dose);
                EquationResult = "\\[    " + dose + "\\times" + 1 + "=\\frac{" + vmax + "\\times " + css + "} {" + km + "+" + css + "}     \\]"
            }

        }

        else if (MMmode == "vmax") {
            $('#vmaxButton').removeClass("inactivebutton").addClass("activebutton");
            if ($("#saltSwitch input[type='radio']:checked").val() == "Na") {
                vmax = ( dose * 0.92 * (km + css) ) / css;
                vmax = Math.round(vmax);
                EquationResult = "\\[    " + dose + "\\times" + 0.92 + "=\\frac{" + vmax + "\\times " + css + "} {" + km + "+" + css + "}     \\]";
            } else {
                vmax = ( dose * (km + css) ) / css;
                vmax = Math.round(vmax);
                EquationResult = "\\[    " + dose + "\\times" + 1 + "=\\frac{" + vmax + "\\times " + css + "} {" + km + "+" + css + "}     \\]";
            }

        }

        else if (MMmode == "km") {
            $('#kmButton').removeClass("inactivebutton").addClass("activebutton");
            if ($("#saltSwitch input[type='radio']:checked").val() == "Na") {
                km = ( vmax * css  ) / ( dose * 0.92 ) - css;
                km = Math.round(km * 10) / 10;
                EquationResult = "\\[    " + dose + "\\times" + 0.92 + "=\\frac{" + vmax + "\\times " + css + "} {" + km + "+" + css + "}     \\]";
            } else {
                km = ( vmax * css  ) / ( dose  ) - css;
                km = Math.round(km * 10) / 10;
                EquationResult = "\\[    " + dose + "\\times" + 1 + "=\\frac{" + vmax + "\\times " + css + "} {" + km + "+" + css + "}     \\]";
            }

        }

        else if (MMmode == "load") {
            $('#loadButton').removeClass("inactivebutton").addClass("activebutton");
            if ($("#saltSwitch input[type='radio']:checked").val() == "Na") {
                dose = ( css * vd ) / 0.92;
                dose = Math.round(dose);
                EquationResult = "\\[    " + css + "=\\frac{" + dose + "\\times " + 0.92 + "} {" + vd + "}     \\]";
            } else {
                dose = ( css * vd );
                dose = Math.round(dose);
                EquationResult = "\\[    " + css + "=\\frac{" + dose + "\\times " + 1 + "} {" + vd + "}     \\]";
            }

        }


        else if (MMmode == "tSS") {
            $('#tSSbutton').removeClass("inactivebutton").addClass("activebutton");
            t90 = ( (km * vd) / ( (vmax - dose) * (vmax - dose) ) ) * ( (2.3 * vmax) - (0.9 * dose ) );
            t90 = Math.round(t90 * 10) / 10;
            EquationResult = "\\[    " + t90 + "=\\frac{" + km + "\\times" + vd + "}{(" + vmax + "-" + dose + ")^{2}}[(2.3\\times" + vmax + ")-(0.9\\times" + dose + ")]    \\]";

        }


        else if (MMmode == "2conc") {
            $('#2concButton').removeClass("inactivebutton").addClass("activebutton");
            km = ( x1 - x2 ) / ( x1 / c1 - x2 / c2);
            km = Math.round(km * 10) / 10;
            EquationResult = "\\[   " + km + "=\\frac{" + x1 + "-" + x2 + "}   {  \\frac{" + x1 + "}{" + c1 + "}-\\frac{" + x2 + "}{" + c2 + "}  }      \\]";

        }


        $("#EquationResult").text(EquationResult);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "EquationResult"]);

    }


    function updateChart() {

        var chartData = [];


        if (MMmode == "2conc") {
            var x1 = Number($('#x1').val());
            var x2 = Number($('#x2').val());
            var c1 = Number($('#c1').val());
            var c2 = Number($('#c2').val());
            var km = ( x1 - x2 ) / ( x1 / c1 - x2 / c2);

            chartData.push({
                x: 0,
                y: (x2 * (-1 * km + c2)) / c2,
                marker: {
                    symbol: 'url(img/vmax.PNG)'
                },
            });


            chartData.push({
                x: (x2 / c2),
                y: x2,
                marker: {
                    symbol: 'circle'
                },
            });


            chartData.push({
                x: (x1 / c1),
                y: x1,
                marker: {
                    symbol: 'circle'
                },
            });


        }

        else {


            var vmax = Number($('#vmax').val());
            var km = Number($('#km').val());


            if ($("#saltSwitch input[type='radio']:checked").val() == "Na") {
                var salt = 0.92;
            } else {
                var salt = 1;
            }


            for (var t = 1; t < (vmax); t = t + 1) {
                chartData.push({
                    x: t,
                    y: t * salt * km / (vmax - t * salt  ),
                    marker: {
                        symbol: 'circle'
                    },
                });
                if ((t * km / (vmax - t)) > 40) {
                    break;
                }
            }

        }
        chart.series[0].setData(chartData);

    }

    // End Update Chart


    // Post-initialization interface (e.g., buttons)
    $('#saltSwitch').click(function () {
        initializeEquation();
        updateEquation();
        updateChart();


    });

    $('#doseButton').click(function () {
        $.cookie('MMmode', 'dose');
        chart.destroy();
        chart = new Highcharts.Chart(options);
        resetButtons();
        $('#doseButton').removeClass("inactivebutton").addClass("activebutton");
        $('#dose_input').hide();
        updateEquation();
        updateChart();
    });


    $('#cssButton').click(function () {
        $.cookie('MMmode', 'css');
        chart.destroy();
        chart = new Highcharts.Chart(options);
        resetButtons();
        $('#cgButton').removeClass("inactivebutton").addClass("activebutton");
        $('#css_input').hide();
        updateEquation();
        updateChart();
    });

    $('#kmButton').click(function () {
        $.cookie('MMmode', 'km');
        chart.destroy();
        chart = new Highcharts.Chart(options);
        resetButtons();
        $('#kmButton').removeClass("inactivebutton").addClass("activebutton");
        $('#km_input').hide();
        updateEquation();
        updateChart();

    });


    $('#vmaxButton').click(function () {
        $.cookie('MMmode', 'vmax');
        chart.destroy();
        chart = new Highcharts.Chart(options);
        resetButtons();
        $('#vmaxButton').removeClass("inactivebutton").addClass("activebutton");
        $('#vmax_input').hide();
        updateEquation();
        updateChart();

    });


    $('#loadButton').click(function () {
        $.cookie('MMmode', 'load');
        resetButtons();
        $('#loadButton').removeClass("inactivebutton").addClass("activebutton");
        $('#km_input').hide();
        $('#vd_input').show();
        $('#container').hide();
        $('#vmax_input').hide();
        $('#dose_input').hide();
        updateEquation();
    });


    $('#tSSButton').click(function () {
        $.cookie('MMmode', 'tSS');
        resetButtons();
        $('#tSSButton').removeClass("inactivebutton").addClass("activebutton");
        $('#km_input').show();
        $('#vd_input').show();
        $('#container').hide();
        $('#vmax_input').show();
        $('#dose_input').show();
        $('#css_input').hide();
        $('#saltSwitch').hide();
        updateEquation();
    });


    $('#2concButton').click(function () {
        $.cookie('MMmode', '2conc');

        var options2 = {
            chart: {
                renderTo: 'container'
            },
            title: {
                text: 'Two Concentrations at Steady-State',
                x: -20 //center
            },
            xAxis: {
                type: 'linear',
                title: {
                    text: 'Dose / Concentration'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },

            yAxis: {
                type: 'linear',
                title: {
                    text: 'Daily Dose'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return 'Dose = ' + parseFloat(Math.round(this.y * 100) / 100).toFixed(0) + ', Dose/Conc = ' + parseFloat(Math.round(this.x * 100) / 100).toFixed(0);
                }
            },
            labels: {
                items: [{
                    html: 'slope = -Km',
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
                name: '',
                data: data
            }]

        };


        chart.destroy();
        chart = new Highcharts.Chart(options2);
        resetButtons();
        $('#2concButton').removeClass("inactivebutton").addClass("activebutton");
        $('#saltSwitch').hide();
        $('#km_input').hide();
        $('#vd_input').hide();
        $('#vmax_input').hide();
        $('#css_input').hide();
        $('#dose_input').hide();
        $('#x1_input').show();
        $('#x2_input').show();
        $('#c1_input').show();
        $('#c2_input').show();
        $('#container').show();
        updateEquation();
        updateChart();
    });


    $("#slider-dose").slider({
        animate: "fast",
        min: 1,
        max: 1200,
        step: 1,
        value: 300,
        change: function (event, ui) {
        },
        slide: function (event, ui) {
            $("#dose").val(ui.value);
            updateEquation();
            updateChart();
        }
    });
    $("#dose").val($("#slider-dose").slider("value"));


    $("#slider-vmax").slider({
        animate: "fast",
        min: 1,
        max: 1200,
        step: 1,
        value: 380,
        change: function (event, ui) {
        },
        slide: function (event, ui) {
            $("#vmax").val(ui.value);
            updateEquation();
            updateChart();
        }
    });
    $("#vmax").val($("#slider-vmax").slider("value"));


    $("#slider-vd").slider({
        animate: "fast",
        min: 7,
        max: 120,
        step: 1,
        value: 50,
        change: function (event, ui) {
        },
        slide: function (event, ui) {
            $("#vd").val(ui.value);
            updateEquation();
            updateChart();
        }
    });
    $("#vd").val($("#slider-vd").slider("value"));


    $("#slider-css").slider({
        animate: "fast",
        min: 0.1,
        max: 40,
        step: 0.1,
        value: 15,
        slide: function (event, ui) {
            $("#css").val(ui.value);
            updateEquation();
            updateChart();
        },

    });
    $("#css").val($("#slider-css").slider("value"));


    $("#slider-km").slider({
        animate: "fast",
        min: 0.1,
        max: 8,
        step: 0.1,
        value: 4,
        slide: function (event, ui) {
            $("#km").val(ui.value);
            updateEquation();
            updateChart();
        },

    });
    $("#km").val($("#slider-km").slider("value"));


    $("#slider-x1").slider({
        animate: "fast",
        min: 1,
        max: 1200,
        step: 1,
        value: 300,
        change: function (event, ui) {
        },
        slide: function (event, ui) {
            $("#x1").val(ui.value);
            updateEquation();
            updateChart();
        }
    });
    $("#x1").val($("#slider-x1").slider("value"));


    $("#slider-x2").slider({
        animate: "fast",
        min: 1,
        max: 1200,
        step: 1,
        value: 400,
        change: function (event, ui) {
        },
        slide: function (event, ui) {
            $("#x2").val(ui.value);
            updateEquation();
            updateChart();
        }
    });
    $("#x2").val($("#slider-x2").slider("value"));


    $("#slider-c1").slider({
        animate: "fast",
        min: 1,
        max: 40,
        step: 0.1,
        value: 7,
        change: function (event, ui) {
        },
        slide: function (event, ui) {
            $("#c1").val(ui.value);
            updateEquation();
            updateChart();
        }
    });
    $("#c1").val($("#slider-c1").slider("value"));


    $("#slider-c2").slider({
        animate: "fast",
        min: 1,
        max: 40,
        step: 0.1,
        value: 20,
        change: function (event, ui) {
        },
        slide: function (event, ui) {
            $("#c2").val(ui.value);
            updateEquation();
            updateChart();
        }
    });
    $("#c2").val($("#slider-c2").slider("value"));


    // Begin Creating Chart                    
    var data = []; // empty data array


    var options = {
        chart: {
            renderTo: 'container'
        },
        title: {
            text: 'Michaelis-Menten',
            x: -20 //center
        },
        xAxis: {
            type: 'linear',
            title: {
                text: 'Daily Dose (mg)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },

        yAxis: {
            type: 'linear',
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
                return 'Conc = ' + parseFloat(Math.round(this.y * 100) / 100).toFixed(1) + ' mg/L at ' + parseFloat(Math.round(this.x * 100) / 100).toFixed(0) + ' mg/day';
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
    updateEquation();
    updateChart();
    // Should be in initialization 


});
 
 
 
 
 
 


