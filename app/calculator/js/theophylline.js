// JavaScript source code


function resetButtons() {
    $('#loadDoseButton').removeClass("activebutton").addClass("inactivebutton");
    $('#loadCButton').removeClass("activebutton").addClass("inactivebutton");
    $('#doseMaintButton').removeClass("activebutton").addClass("inactivebutton");
    $('#clMaintButton').removeClass("activebutton").addClass("inactivebutton");
    $('#cMaintButton').removeClass("activebutton").addClass("inactivebutton");
    $('#tauMaintButton').removeClass("activebutton").addClass("inactivebutton");
    $('#doseformSwitch').hide();

    $('#equation_equations').show();

    $('#c_input').hide();
    $('#dose_input').hide();
    $('#vd_input').hide();
    $('#tau_input').hide();
    $('#cl_input').hide();

    initializeEquation();

}


$(function () {
    $("#doseformSwitch").buttonset();
});


function initializeEquation() {

    theoMode = $.cookie('theoMode');
    var Equation = "";


    if (theoMode == "loadDose") {
        Equation = "\\[      \\Delta C_{desired}=\\frac{X_{0}\\cdot S\\cdot F}{V_{d}}      \\]";
        EquationResult = "\\[  \\Delta C_{desired}=\\frac{X_{0}\\cdot S\\cdot F}{V_{d}}        \\]";
    }

    else if (theoMode == "loadC") {
        Equation = "\\[      \\Delta C_{desired}=\\frac{X_{0}\\cdot S\\cdot F}{V_{d}}       \\]";
        EquationResult = "\\[  \\Delta C_{desired}=\\frac{X_{0}\\cdot S\\cdot F}{V_{d}}       \\]";
    }


    else if (theoMode == "doseMaint") {
        Equation = "\\[     C_{ss}=\\frac{X_{d}\\cdot S \\cdot F}{Cl \\cdot \\tau }     \\]";
        EquationResult = "\\[    C_{ss}=\\frac{X_{d}\\cdot S \\cdot F}{Cl \\cdot \\tau }      \\]";
    }


    else if (theoMode == "cMaint") {
        Equation = "\\[     C_{ss}=\\frac{X_{d}\\cdot S \\cdot F}{Cl \\cdot \\tau }     \\]";
        EquationResult = "\\[   C_{ss}=\\frac{X_{d}\\cdot S \\cdot F}{Cl \\cdot \\tau }    \\]";
    }


    else if (theoMode == "clMaint") {
        Equation = "\\[     C_{ss}=\\frac{X_{d}\\cdot S \\cdot F}{Cl \\cdot \\tau }     \\]";
        EquationResult = "\\[    C_{ss}=\\frac{X_{d}\\cdot S \\cdot F}{Cl \\cdot \\tau }      \\]";
    }


    else if (theoMode == "tauMaint") {
        Equation = "\\[     C_{ss}=\\frac{X_{d}\\cdot S \\cdot F}{Cl \\cdot \\tau }     \\]";
        EquationResult = "\\[    C_{ss}=\\frac{X_{d}\\cdot S \\cdot F}{Cl \\cdot \\tau }     \\]";
    }


    $("#Equation").text(Equation);
    $("#EquationResult").text(EquationResult);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

}


$(document).ready(function () {

    // Initialization 				
    resetButtons();
    var theoMode = $.cookie('theoMode');

    if (theoMode == null) {
        $.cookie('theoMode', 'loadDose');
        theoMode = $.cookie('theoMode');
    }

    if (theoMode == "loadDose") {
        resetButtons();
        $('#loadDoseButton').removeClass("inactivebutton").addClass("activebutton");
        $('#c_input').show();
        $('#vd_input').show();
        $('#scr_input').show();
        $('#doseformSwitch').show();
    }


    else if (theoMode == "loadC") {
        resetButtons();
        $('#loadCButton').removeClass("inactivebutton").addClass("activebutton");
        $('#dose_input').show();
        $('#vd_input').show();
        $('#scr_input').show();
        $('#doseformSwitch').show();
    }


    else if (theoMode == "doseMaint") {
        resetButtons();
        $('#doseMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#tau_input').show();
        $('#cl_input').show();
        $('#c_input').show();
        $('#vd_input').show();
        $('#doseformSwitch').show();
    }


    else if (theoMode == "cMaint") {
        resetButtons();
        $('#cMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#tau_input').show();
        $('#cl_input').show();
        $('#dose_input').show();
        $('#doseformSwitch').show();
    }


    else if (theoMode == "clMaint") {
        resetButtons();
        $('#clMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#tau_input').show();
        $('#dose_input').show();
        $('#c_input').show();
        $('#doseformSwitch').show();
    }


    else if (theoMode == "tauMaint") {
        resetButtons();
        $('#tauMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#cl_input').show();
        $('#dose_input').show();
        $('#c_input').show();
        $('#doseformSwitch').show();
    }


    //End Initialization


    function updateEquation() {
        theoMode = $.cookie('theoMode');
        var Equation = "";
        var EquationResult = "";
        var dose = Number($('#dose').val());
        dose = Math.round(dose);
        var c = Number($('#c').val());
        c = Math.round(c * 10) / 10;
        var cl = Number($('#cl').val());
        cl = Math.round(cl * 10) / 10;
        var vd = Number($('#vd').val());
        vd = Math.round(vd * 10) / 10;
        var F = 1;
        var S = Number($("#doseformSwitch input[type='radio']:checked").val());
        var tau = Number($('#tau').val());
        tau = Math.round(tau);


        if (theoMode == "loadDose") {
            dose = c * vd / S;
            dose = Math.round(dose);
            Equation = "\\[       \\Delta C_{desired}=\\frac{X_{0}\\cdot S\\cdot F}{V_{d}}      \\]";
            EquationResult = "\\[ " + c + "=\\frac{" + dose + "\\cdot " + S + "\\cdot " + F + "}{" + vd + "}       \\]";
        }

        else if (theoMode == "loadC") {
            c = dose * S / vd;
            c = Math.round(c * 10) / 10;
            Equation = "\\[      \\Delta C_{desired}=\\frac{X_{0}\\cdot S\\cdot F}{V_{d}}        \\]";
            EquationResult = "\\[ " + c + "=\\frac{" + dose + "\\cdot " + S + "\\cdot " + F + "}{" + vd + "}       \\]";
        }


        else if (theoMode == "doseMaint") {
            dose = c * cl * tau / S;
            dose = Math.round(dose);
            Equation = "\\[     C_{ss}=\\frac{X_{d}\\cdot S \\cdot F}{Cl \\cdot \\tau }     \\]";
            EquationResult = "\\[ " + c + "  =\\frac{" + dose + "\\cdot " + S + " \\cdot " + F + "}{" + cl + "\\cdot " + tau + " }     \\]";
        }


        else if (theoMode == "cMaint") {
            c = dose * S / (cl * tau );
            c = Math.round(c * 10) / 10;
            Equation = "\\[     C_{ss}=\\frac{X_{d}\\cdot S \\cdot F}{Cl \\cdot \\tau }     \\]";
            EquationResult = "\\[ " + c + "  =\\frac{" + dose + "\\cdot " + S + " \\cdot " + F + "}{" + cl + "\\cdot " + tau + " }     \\]";
        }


        else if (theoMode == "clMaint") {
            cl = dose * S / ( c * tau );
            cl = Math.round(cl * 10) / 10;
            Equation = "\\[     C_{ss}=\\frac{X_{d}\\cdot S \\cdot F}{Cl \\cdot \\tau }     \\]";
            EquationResult = "\\[ " + c + "  =\\frac{" + dose + "\\cdot " + S + " \\cdot " + F + "}{" + cl + "\\cdot " + tau + " }     \\]";
        }


        $("#EquationResult").text(EquationResult);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "EquationResult"]);

    }


    // Post-initialization interface (e.g., buttons)

    $('#doseformSwitch').click(function () {
        initializeEquation();
        updateEquation();
    });

    $('#loadDoseButton').click(function () {
        $.cookie('theoMode', 'loadDose');
        resetButtons();
        $('#loadDoseButton').removeClass("inactivebutton").addClass("activebutton");
        $('#c_input').show();
        $('#vd_input').show();
        $('#doseformSwitch').show();
        updateEquation();
    });


    $('#loadCButton').click(function () {
        $.cookie('theoMode', 'loadC');
        resetButtons();
        $('#loadCButton').removeClass("inactivebutton").addClass("activebutton");
        $('#dose_input').show();
        $('#vd_input').show();
        $('#doseformSwitch').show();
        updateEquation();
    });


    $('#doseMaintButton').click(function () {
        $.cookie('theoMode', 'doseMaint');
        resetButtons();
        $('#doseMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#cl_input').show();
        $('#c_input').show();
        $('#tau_input').show();
        $('#doseformSwitch').show();
        updateEquation();
    });


    $('#cMaintButton').click(function () {
        $.cookie('theoMode', 'cMaint');
        resetButtons();
        $('#cMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#cl_input').show();
        $('#dose_input').show();
        $('#tau_input').show();
        $('#doseformSwitch').show();
        updateEquation();
    });


    $('#clMaintButton').click(function () {
        $.cookie('theoMode', 'clMaint');
        resetButtons();
        $('#clMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#dose_input').show();
        $('#c_input').show();
        $('#tau_input').show();
        $('#doseformSwitch').show();
        updateEquation();
    });


    $("#slider-c").slider({
        animate: "fast",
        min: 1,
        max: 25,
        step: .1,
        value: 10,
        change: function (event, ui) {
        },
        slide: function (event, ui) {
            $("#c").val(ui.value);
            updateEquation();
        }
    });
    $("#c").val($("#slider-c").slider("value"));


    $("#slider-dose").slider({
        animate: "fast",
        min: 1,
        max: 1000,
        step: 1,
        value: 125,
        change: function (event, ui) {
        },
        slide: function (event, ui) {
            $("#dose").val(ui.value);
            updateEquation();
        }
    });
    $("#dose").val($("#slider-dose").slider("value"));


    $("#slider-vd").slider({
        animate: "fast",
        min: 1,
        max: 100,
        step: 1,
        value: 35,
        slide: function (event, ui) {
            $("#vd").val(ui.value);
            updateEquation();
        },

    });
    $("#vd").val($("#slider-vd").slider("value"));


    $("#slider-cl").slider({
        animate: "fast",
        min: 0.1,
        max: 10,
        step: 0.1,
        value: 3,
        slide: function (event, ui) {
            $("#cl").val(ui.value);
            updateEquation();
        },

    });
    $("#cl").val($("#slider-cl").slider("value"));


    $("#slider-tau").slider({
        animate: "fast",
        min: 1,
        max: 72,
        step: 1,
        value: 24,
        slide: function (event, ui) {
            $("#tau").val(ui.value);
            updateEquation();
        },

    });
    $("#tau").val($("#slider-tau").slider("value"));

    // Should be in initialization


    updateEquation();
    // Should be in initialization 


});
 
 
 
 
 
 


