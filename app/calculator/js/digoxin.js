// JavaScript source code


function resetButtons() {
    $('#loadDoseButton').removeClass("activebutton").addClass("inactivebutton");
    $('#loadCButton').removeClass("activebutton").addClass("inactivebutton");
    $('#EmpiricVdButton').removeClass("activebutton").addClass("inactivebutton");
    $('#EmpiricClButton').removeClass("activebutton").addClass("inactivebutton");
    $('#doseMaintButton').removeClass("activebutton").addClass("inactivebutton");
    $('#clMaintButton').removeClass("activebutton").addClass("inactivebutton");
    $('#cMaintButton').removeClass("activebutton").addClass("inactivebutton");
    $('#tauMaintButton').removeClass("activebutton").addClass("inactivebutton");
    $('#doseformSwitch').hide();
    $('#hfSwitch').hide();

    $('#equation_equations').show();
    $('#clearanceEquations').hide();
    $('#vdEquations').hide();

    $('#c_input').hide();
    $('#dose_input').hide();
    $('#vd_input').hide();
    $('#ibw_input').hide();
    $('#GFR_input').hide();
    $('#cl_input').hide();
    $('#tau_input').hide();

    initializeEquation();

}


$(function () {
    $("#hfSwitch").buttonset();
});
$(function () {
    $("#doseformSwitch").buttonset();
});


function initializeEquation() {

    DigMode = $.cookie('DigMode');
    var Equation = "";


    if (DigMode == "loadDose") {
        Equation = "\\[      C = \\frac{X_{0}\\times F}{V_{d}}       \\]";
        EquationResult = "\\[   C = \\frac{X_{0}\\times F}{V_{d}}         \\]";
    }

    else if (DigMode == "loadC") {
        Equation = "\\[      C = \\frac{X_{0}\\times F}{V_{d}}       \\]";
        EquationResult = "\\[  C = \\frac{X_{0}\\times F}{V_{d}}        \\]";
    }

    else if (DigMode == "loadVd") {
        Equation = "\\[      C = \\frac{X_{0}\\times F}{V_{d}}       \\]";
        EquationResult = "\\[   C = \\frac{X_{0}\\times F}{V_{d}}          \\]";
    }


    else if (DigMode == "doseMaint") {
        Equation = "\\[     C_{ss}=\\frac{X_{d}\\times 10^{6}\\times F}{Cl_{t}\\times \\tau }      \\]";
        EquationResult = "\\[    C_{ss}=\\frac{X_{d}\\times 10^{6}\\times F}{Cl_{t}\\times \\tau }      \\]";
    }


    else if (DigMode == "cMaint") {
        Equation = "\\[     C_{ss}=\\frac{X_{d}\\times 10^{6}\\times F}{Cl_{t}\\times \\tau }      \\]";
        EquationResult = "\\[    C_{ss}=\\frac{X_{d}\\times 10^{6}\\times F}{Cl_{t}\\times \\tau }      \\]";
    }


    else if (DigMode == "clMaint") {
        Equation = "\\[     C_{ss}=\\frac{X_{d}\\times 10^{6}\\times F}{Cl_{t}\\times \\tau }      \\]";
        EquationResult = "\\[    C_{ss}=\\frac{X_{d}\\times 10^{6}\\times F}{Cl_{t}\\times \\tau }      \\]";
    }


    else if (DigMode == "tauMaint") {
        Equation = "\\[     C_{ss}=\\frac{X_{d}\\times 10^{6}\\times F}{Cl_{t}\\times \\tau }      \\]";
        EquationResult = "\\[    C_{ss}=\\frac{X_{d}\\times 10^{6}\\times F}{Cl_{t}\\times \\tau }      \\]";
    }


    else if (DigMode == "empiricCl") {
        Equation = "\\[     Cl_{t}=(1.101\\times Cl_{r})+Cl_{m}      \\]";
        EquationResult = "\\[   Cl_{t}=(1.101\\times Cl_{r})+Cl_{m}     \\]";
        var renalClearance = "\\[   Cl_{r}=0.927\\times GFR   \\]";
        var metabolicClearance = "\\[   Cl_{m}= \\frac{" + $("#doseformSwitch input[type='radio']:checked").val() + " \\: mL}{min\\cdot 1.73 m^{2}}   \\]";
        $("#renalClearance").text(renalClearance);
        $("#metabolicClearance").text(metabolicClearance);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "renalClearance"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "metabolicClearance"]);
    }

    else if (DigMode == "empiricVd") {
        Equation = "\\[    V_{d}=V_{min}+\\frac{V_{n}\\times CrCl}{K_{D}+CrCl}     \\]";
        EquationResult = "\\[       V_{d}=V_{min}+\\frac{V_{n}\\times CrCl}{K_{D}+CrCl}       \\]";
        var Vmin = "\\[  V_{min}=3.56\\tfrac{L}{kg} \\times weight   \\]";
        var Vn = "\\[   V_{n}=4.7\\tfrac{L}{kg} \\times weight   \\]";
        var Kd = "\\[   K_{D}=0.459\\tfrac{\\frac{mL}{min}}{kg} \\times weight    \\]";
        $("#Vmin").text(Vmin);
        $("#Vn").text(Vn);
        $("#Kd").text(Kd);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "Vmin"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "Vn"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "Kd"]);
    }


    $("#Equation").text(Equation);
    $("#EquationResult").text(EquationResult);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

}


$(document).ready(function () {

    // Initialization 				
    resetButtons();
    var DigMode = $.cookie('DigMode');

    if (DigMode == null) {
        $.cookie('DigMode', 'loadDose');
        DigMode = $.cookie('DigMode');
    }

    if (DigMode == "loadDose") {
        resetButtons();
        $('#loadDoseButton').removeClass("inactivebutton").addClass("activebutton");
        $('#c_input').show();
        $('#vd_input').show();
        $('#scr_input').show();
        $('#doseformSwitch').show();
    }


    else if (DigMode == "loadVd") {
        resetButtons();
        $('#loadVdButton').removeClass("inactivebutton").addClass("activebutton");
        $('#dose_input').show();
        $('#c_input').show();
        $('#scr_input').show();
        $('#doseformSwitch').show();
    }


    else if (DigMode == "loadC") {
        resetButtons();
        $('#loadCButton').removeClass("inactivebutton").addClass("activebutton");
        $('#dose_input').show();
        $('#vd_input').show();
        $('#scr_input').show();
        $('#doseformSwitch').show();
    }


    else if (DigMode == "doseMaint") {
        resetButtons();
        $('#doseMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#tau_input').show();
        $('#cl_input').show();
        $('#c_input').show();
        $('#doseformSwitch').show();
    }


    else if (DigMode == "cMaint") {
        resetButtons();
        $('#cMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#tau_input').show();
        $('#cl_input').show();
        $('#dose_input').show();
        $('#doseformSwitch').show();
    }


    else if (DigMode == "clMaint") {
        resetButtons();
        $('#clMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#tau_input').show();
        $('#dose_input').show();
        $('#c_input').show();
        $('#doseformSwitch').show();
    }


    else if (DigMode == "tauMaint") {
        resetButtons();
        $('#tauMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#cl_input').show();
        $('#dose_input').show();
        $('#c_input').show();
        $('#doseformSwitch').show();
    }


    else if (DigMode == "empiricCl") {
        resetButtons();
        $('#empiricClButton').removeClass("inactivebutton").addClass("activebutton");
        $('#GFR_input').show();
        $('#clearanceEquations').show();
        $('#hfSwitch').show();
    }


    else if (DigMode == "empiricVd") {
        resetButtons();
        $('#empiricVdButton').removeClass("inactivebutton").addClass("activebutton");
        $('#GFR_input').show();
        $('#ibw_input').show();
        $('#vdEquations').show();
    }

    //End Initialization


    function updateEquation() {
        DigMode = $.cookie('DigMode');
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
        var F = Number($("#doseformSwitch input[type='radio']:checked").val());
        var tau = Number($('#tau').val());
        tau = Math.round(tau);
        var GFR = Number($('#GFR').val());
        GFR = Math.round(GFR);
        var clm = Number($("#hfSwitch input[type='radio']:checked").val());
        clm = Math.round(clm);
        var ibw = Number($('#ibw').val());
        ibw = Math.round(ibw);

        if (DigMode == "loadDose") {
            dose = c * vd / F;
            dose = Math.round(dose);
            Equation = "\\[      C = \\frac{X_{0}\\times F}{V_{d}}       \\]";
            EquationResult = "\\[ " + c + " = \\frac{" + dose + "\\times " + F + "}{" + vd + "}       \\]";
        }

        else if (DigMode == "loadC") {
            c = dose * F / vd;
            c = Math.round(c * 10) / 10;
            Equation = "\\[      C = \\frac{X_{0}\\times F}{V_{d}}       \\]";
            EquationResult = "\\[ " + c + " = \\frac{" + dose + "\\times " + F + "}{" + vd + "}       \\]";
        }


        else if (DigMode == "loadC") {
            c = dose * F / vd;
            c = Math.round(c * 10) / 10;
            Equation = "\\[      C = \\frac{X_{0}\\times F}{V_{d}}       \\]";
            EquationResult = "\\[ " + c + " = \\frac{" + dose + "\\times " + F + "}{" + vd + "}       \\]";
        }


        else if (DigMode == "doseMaint") {
            tauminutes = tau * 60;
            dose = c * cl * tauminutes / 1000 / F;
            dose = Math.round(dose);
            Equation = "\\[      C_{ss}=\\frac{X_{d}\\times 10^{6}\\times F}{Cl_{t}\\times \\tau }        \\]";
            EquationResult = "\\[   " + c + "=\\frac{" + dose + "\\times 10^{6}\\times " + F + "}{" + cl + "\\times " + tauminutes + " }       \\]";
        }


        else if (DigMode == "cMaint") {
            tauminutes = tau * 60;
            c = dose / cl / tauminutes * 1000 * F;
            c = Math.round(c * 10) / 10;
            Equation = "\\[      C_{ss}=\\frac{X_{d}\\times 10^{6}\\times F}{Cl_{t}\\times \\tau }        \\]";
            EquationResult = "\\[   " + c + "=\\frac{" + dose + "\\times 10^{6}\\times " + F + "}{" + cl + "\\times " + tauminutes + " }       \\]";
        }


        else if (DigMode == "clMaint") {
            tauminutes = tau * 60;
            cl = dose / c / tauminutes * 1000 * F;
            cl = Math.round(cl);
            Equation = "\\[      C_{ss}=\\frac{X_{d}\\times 10^{6}\\times F}{Cl_{t}\\times \\tau }        \\]";
            EquationResult = "\\[   " + c + "=\\frac{" + dose + "\\times 10^{6}\\times " + F + "}{" + cl + "\\times " + tauminutes + " }       \\]";
        }


        else if (DigMode == "tauMaint") {
            tauminutes = dose / cl / c * 1000 * F;
            tau = tauminutes / 60;
            tau = Math.round(tau);
            Equation = "\\[      C_{ss}=\\frac{X_{d}\\times 10^{6}\\times F}{Cl_{t}\\times \\tau }        \\]";
            EquationResult = "\\[   " + c + "=\\frac{" + dose + "\\times 10^{6}\\times " + F + "}{" + cl + "\\times (" + tau + "\\times 60 )}       \\]";
        }


        else if (DigMode == "empiricCl") {
            cl = ( 1.101 * 0.927 * GFR ) + clm;
            cl = Math.round(cl);
            Equation = "\\[     Cl_{t}=(1.101\\times Cl_{r})+Cl_{m}      \\]";
            EquationResult = "\\[   " + cl + "=(1.101\\times " + Math.round(0.927 * GFR) + ")+" + $("#hfSwitch input[type='radio']:checked").val() + "     \\]";
            var renalClearanceEquation = "\\[   Cl_{r}=0.927\\times GFR   \\]";
            renalClearance = "\\[   Cl_{r}=0.927\\times " + GFR + "   \\]";
            metabolicClearance = "\\[   Cl_{m}= \\frac{" + $("#hfSwitch input[type='radio']:checked").val() + " \\: mL}{min\\cdot 1.73 m^{2}}   \\]"
            $("#renalClearanceEquation").text(renalClearanceEquation);
            $("#renalClearance").text(renalClearance);
            $("#metabolicClearance").text(metabolicClearance);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "renalClearanceEquation"]);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "renalClearance"]);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "metabolicClearance"]);
        }


        else if (DigMode == "empiricVd") {
            vd = 3.56 * ibw + ( (4.7 * ibw * GFR) / (0.459 * ibw + GFR) );
            vd = Math.round(vd);


            Equation = "\\[    V_{d}=V_{min}+\\frac{V_{n}\\times CrCl}{K_{D}+CrCl}     \\]";
            EquationResult = "\\[       " + vd + "=" + Math.round(ibw * 3.56) + "+\\frac{" + Math.round(4.7 * ibw) + "\\times " + Math.round(GFR) + "}{" + Math.round(0.459 * ibw) + "+" + GFR + "}       \\]";


            var VminEquation = "\\[  V_{min}=3.56\\tfrac{L}{kg} \\times weight   \\]";
            var VnEquation = "\\[   V_{n}=4.7\\tfrac{L}{kg} \\times weight   \\]";
            var KdEquation = "\\[   K_{D}=0.459\\tfrac{\\frac{mL}{min}}{kg} \\times weight    \\]";

            var Vmin = "\\[  " + Math.round(ibw * 3.56) + "=3.56\\tfrac{L}{kg} \\times " + ibw + "   \\]";

            var Vn = "\\[   " + Math.round(ibw * 4.7) + "=4.7\\tfrac{L}{kg} \\times " + ibw + "   \\]";

            var Kd = "\\[   " + Math.round(ibw * 0.459) + "=0.459\\tfrac{\\frac{mL}{min}}{kg} \\times " + ibw + "    \\]";


            $("#VminEquation").text(VminEquation);
            $("#VnEquation").text(VnEquation);
            $("#KdEquation").text(KdEquation);
            $("#Vmin").text(Vmin);
            $("#Vn").text(Vn);
            $("#Kd").text(Kd);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "VminEquation"]);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "VnEquation"]);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "KdEquation"]);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "Vmin"]);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "Vn"]);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "Kd"]);
        }


        $("#EquationResult").text(EquationResult);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "EquationResult"]);

    }


    // Post-initialization interface (e.g., buttons)


    $('#hfSwitch').click(function () {
        initializeEquation();
        updateEquation();
    });

    $('#doseformSwitch').click(function () {
        initializeEquation();
        updateEquation();
    });

    $('#loadDoseButton').click(function () {
        $.cookie('DigMode', 'loadDose');
        resetButtons();
        $('#loadDoseButton').removeClass("inactivebutton").addClass("activebutton");
        $('#c_input').show();
        $('#vd_input').show();
        $('#doseformSwitch').show();
        updateEquation();
    });


    $('#loadCButton').click(function () {
        $.cookie('DigMode', 'loadC');
        resetButtons();
        $('#loadCButton').removeClass("inactivebutton").addClass("activebutton");
        $('#dose_input').show();
        $('#vd_input').show();
        $('#doseformSwitch').show();
        updateEquation();
    });


    $('#loadVdButton').click(function () {
        $.cookie('DigMode', 'loadVd');
        resetButtons();
        $('#loadVdButton').removeClass("inactivebutton").addClass("activebutton");
        $('#dose_input').show();
        $('#c_input').show();
        $('#doseformSwitch').show();
        updateEquation();
    });


    $('#doseMaintButton').click(function () {
        $.cookie('DigMode', 'doseMaint');
        resetButtons();
        $('#doseMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#cl_input').show();
        $('#c_input').show();
        $('#tau_input').show();
        $('#doseformSwitch').show();
        updateEquation();
    });


    $('#cMaintButton').click(function () {
        $.cookie('DigMode', 'cMaint');
        resetButtons();
        $('#cMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#cl_input').show();
        $('#dose_input').show();
        $('#tau_input').show();
        $('#doseformSwitch').show();
        updateEquation();
    });


    $('#clMaintButton').click(function () {
        $.cookie('DigMode', 'clMaint');
        resetButtons();
        $('#clMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#dose_input').show();
        $('#c_input').show();
        $('#tau_input').show();
        $('#doseformSwitch').show();
        updateEquation();
    });


    $('#tauMaintButton').click(function () {
        $.cookie('DigMode', 'tauMaint');
        resetButtons();
        $('#tauMaintButton').removeClass("inactivebutton").addClass("activebutton");
        $('#dose_input').show();
        $('#c_input').show();
        $('#cl_input').show();
        $('#doseformSwitch').show();
        updateEquation();
    });


    $('#EmpiricClButton').click(function () {
        $.cookie('DigMode', 'empiricCl');
        resetButtons();
        $('#EmpiricClButton').removeClass("inactivebutton").addClass("activebutton");
        $('#GFR_input').show();
        $('#hfSwitch').show();
        $('#clearanceEquations').show();
        $('#renalClearance').show();
        $('#metabolicClearance').show();
        updateEquation();
    });


    $('#EmpiricVdButton').click(function () {
        $.cookie('DigMode', 'empiricVd');
        resetButtons();
        $('#EmpiricVdButton').removeClass("inactivebutton").addClass("activebutton");
        $('#GFR_input').show();
        $('#ibw_input').show();
        $('#vdEquations').show();
        updateEquation();
    });


    $("#slider-c").slider({
        animate: "fast",
        min: 0,
        max: 3,
        step: 0.1,
        value: 1.0,
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
        min: 150,
        max: 700,
        step: 1,
        value: 350,
        slide: function (event, ui) {
            $("#vd").val(ui.value);
            updateEquation();
        },

    });
    $("#vd").val($("#slider-vd").slider("value"));


    $("#slider-ibw").slider({
        animate: "fast",
        min: 40,
        max: 100,
        step: 1,
        value: 70,
        slide: function (event, ui) {
            $("#ibw").val(ui.value);
            updateEquation();
        },

    });
    $("#ibw").val($("#slider-ibw").slider("value"));


    $("#slider-GFR").slider({
        animate: "fast",
        min: 1,
        max: 150,
        step: 1,
        value: 100,
        slide: function (event, ui) {
            $("#GFR").val(ui.value);
            updateEquation();
        },

    });
    $("#GFR").val($("#slider-GFR").slider("value"));


    $("#slider-cl").slider({
        animate: "fast",
        min: 1,
        max: 200,
        step: 1,
        value: 100,
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
 
 
 
 
 
 


