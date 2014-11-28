// JavaScript source code


function resetButtons() {
    $('#measured').removeClass("activebutton").addClass("inactivebutton");
    $('#cg').removeClass("activebutton").addClass("inactivebutton");
    $('#mdrd').removeClass("activebutton").addClass("inactivebutton");
    $('#ckdepi').removeClass("activebutton").addClass("inactivebutton");
    $('#children').removeClass("activebutton").addClass("inactivebutton");
    $('#genderSwitch').hide();
    $('#raceSwitch').hide();
    $('#pretermSwitch').hide();
    $('#equation_equations').show();
    $('#age_input').hide();
    $('#ibw_input').hide();
    $('#scr_input').hide();
    $('#height_input').hide();
    $('#ckdepi_variables').hide();
    $('#pediatricage_input').hide();
    $('#time_input').hide();
    $('#urineVolume_input').hide();
    $('.urineCollection').hide();
    $('#ucr_input').hide();
    initializeEquation();

}


$(function () {
    $("#genderSwitch").buttonset();
});

$(function () {
    $("#raceSwitch").buttonset();
});
$(function () {
    $("#pretermSwitch").buttonset();
});


function initializeEquation() {

    GFRmode = $.cookie('GFRmode');
    var Equation = "";

    if (GFRmode == "measured") {
        Equation = "\\[      GFR \\approx ClCr = \\frac{[Urine]}{[Serum]}\\times \\frac{Urine\\; Volume}{Collection\\; Time}    \\]";
        EquationResult = "\\[        GFR \\approx ClCr = \\frac{[Urine]}{[Serum]}\\times \\frac{Urine\\; Volume}{Collection\\; Time}   \\]";
    }

    else if (GFRmode == "cg") {
        if ($("#genderSwitch input[type='radio']:checked").val() == "female") {
            Equation = "\\[      GFR\\approx ClCr\\approx  \\frac{(140-Age)\\cdot IBW}{72\\cdot SrCr}\\cdot 0.85       \\]";
            EquationResult = "\\[      GFR\\approx \\frac{(140-Age)\\cdot IBW}{72\\cdot SrCr}\\cdot 0.85      \\]";
        } else {
            Equation = "\\[      GFR\\approx ClCr\\approx   \\frac{(140-Age)\\cdot IBW}{72\\cdot SrCr}       \\]";
            EquationResult = "\\[      GFR\\approx \\frac{(140-Age)\\cdot IBW}{72\\cdot SrCr}       \\]";

        }
    }

    else if (GFRmode == "mdrd") {
        Equation = "\\[    GFR \\approx ClCr \\approx 186 \\times SrCr^{-1.154}\\times Age^{-0.203}\\times [1.210 \\; if \\; Black] \\times [0.742 \\; if \\; female]     \\]";
        EquationResult = "\\[    GFR \\approx ClCr \\approx 186 \\times SrCr^{-1.154}\\times Age^{-0.203}\\times [1.210 \\; if \\; Black] \\times [0.742 \\; if \\; female]     \\]";
    }

    else if (GFRmode == "ckdepi") {
        Equation = "\\[  GFR \\approx ClCr \\approx 141 \\times min(SrCr/k,1)^{a}  \\times max(SrCr/k,1)^{-1.209} \\times 0.993^{Age} \\times [1.018 \\; if \\; female]    \\times [1.159 \\; if \\; Black]      \\]";
        EquationResult = "\\[ GFR \\approx ClCr \\approx 141 \\times min(SrCr/k,1)^{a}  \\times max(SrCr/k,1)^{-1.209} \\times 0.993^{Age} \\times [1.018 \\; if \\; female]    \\times [1.159 \\; if \\; Black]  \\]";
    }

    else if (GFRmode == "children") {
        Equation = "\\[    GFR \\approx ClCr \\approx  \\frac{k\\times Height}{SrCr}    \\]";
        EquationResult = "\\[    GFR \\approx ClCr \\approx  \\frac{k\\times Height}{SrCr}    \\]";
    }

    $("#Equation").text(Equation);
    $("#EquationResult").text(EquationResult);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

}


$(document).ready(function () {

    // Initialization 				
    resetButtons();
    var GFRmode = $.cookie('GFRmode');

    if (GFRmode == null) {
        $.cookie('GFRmode', 'cg');
        GFRmode = $.cookie('GFRmode');
    }
    $('#equation_equations').hide();

    if (GFRmode == "measured") {
        $.cookie('GFRmode', 'measured');
        resetButtons();
        $('#time_input').show();
        $('#urineVolume_input').show();
        $('#ucr_input').show();
        $('#scr_input').show();
        $('.urineCollection').show();
        // updateEquation();


    }

    else if (GFRmode == "cg") {
        resetButtons();
        $('#cg').removeClass("inactivebutton").addClass("activebutton");
        $('#genderSwitch').show();
        $('#age_input').show();
        $('#ibw_input').show();
        $('#scr_input').show();

    }

    else if (GFRmode == "mdrd") {
        resetButtons();
        $('#mdrd').removeClass("inactivebutton").addClass("activebutton");
        $('#genderSwitch').show();
        $('#raceSwitch').show();
        $('#age_input').show();
        $('#scr_input').show();


    }
    else if (GFRmode == "ckdepi") {
        resetButtons();
        $('#ckdepi').removeClass("inactivebutton").addClass("activebutton");
        $('#genderSwitch').show();
        $('#raceSwitch').show();
        $('#age_input').show();
        $('#scr_input').show();
        $('#ckdepi_variables').show();

    }
    else if (GFRmode == "children") {
        resetButtons();
        $('#children').removeClass("inactivebutton").addClass("activebutton");
        $('#pediatricage_input').show();
        $('#scr_input').show();
        $('#height_input').show();

    }


    //End Initialization


    function updateEquation() {
        GFRmode = $.cookie('GFRmode');
        var Equation = "";
        var EquationResult = "";
        var GFR = 0;


        if (GFRmode == "measured") {
            $('#measured').removeClass("inactivebutton").addClass("activebutton");
            GFR = $("#ucr").val() / $("#scr").val() * $("#urineVolume").val() / ( $("#time").val() * 60);
            GFR = Math.round(GFR * 10) / 10;
            EquationResult = "\\[         " + GFR + " \\approx ClCr = \\frac{[" + $("#ucr").val() + "]}{[" + $("#scr").val() + "]}\\times \\frac{" + $("#urineVolume").val() + "}{" + Math.round(($("#time").val() * 60) * 10 / 10) + "}     \\]";
        }

        else if (GFRmode == "cg") {
            $('#cg').removeClass("inactivebutton").addClass("activebutton");
            if ($("#genderSwitch input[type='radio']:checked").val() == "female") {
                GFR = (140 - $("#age").val() ) * $("#ibw").val() / (72 * $("#scr").val() ) * 0.85;
                GFR = Math.round(GFR * 10) / 10;
                EquationResult = "\\[      " + GFR + "= \\frac{(140-" + $("#age").val() + ")\\cdot " + $("#ibw").val() + "}{72\\cdot " + $("#scr").val() + "}\\cdot 0.85      \\]";
            } else {
                GFR = (140 - $("#age").val() ) * $("#ibw").val() / (72 * $("#scr").val() );
                GFR = Math.round(GFR * 10) / 10;
                EquationResult = "\\[      " + GFR + "= \\frac{(140-" + $("#age").val() + ")\\cdot " + $("#ibw").val() + "}{72\\cdot " + $("#scr").val() + "}     \\]";


            }
        }

        else if (GFRmode == "mdrd") {
            $('#mdrd').removeClass("inactivebutton").addClass("activebutton");
            if (($("#genderSwitch input[type='radio']:checked").val() == "female") && ($("#raceSwitch input[type='radio']:checked").val() == "black")) {
                GFR = 186 * Math.pow($("#scr").val(), -1.154) * Math.pow($("#age").val(), -0.203) * 1.210 * 0.742;
                GFR = Math.round(GFR * 10) / 10;
                EquationResult = "\\[    " + GFR + " = 186 \\times " + $("#scr").val() + "^{-1.154}\\times " + $("#age").val() + "^{-0.203}\\times 1.210   \\times 0.742    \\]";

            } else if (($("#genderSwitch input[type='radio']:checked").val() == "female") && ($("#raceSwitch input[type='radio']:checked").val() != "black")) {
                GFR = 186 * Math.pow($("#scr").val(), -1.154) * Math.pow($("#age").val(), -0.203) * 0.742;
                GFR = Math.round(GFR * 10) / 10;
                EquationResult = "\\[    " + GFR + " = 186 \\times " + $("#scr").val() + "^{-1.154}\\times " + $("#age").val() + "^{-0.203}    \\times 0.742    \\]";

            } else if (($("#genderSwitch input[type='radio']:checked").val() != "female") && ($("#raceSwitch input[type='radio']:checked").val() == "black")) {
                GFR = 186 * Math.pow($("#scr").val(), -1.154) * Math.pow($("#age").val(), -0.203) * 1.210;
                GFR = Math.round(GFR * 10) / 10;
                EquationResult = "\\[    " + GFR + " = 186 \\times " + $("#scr").val() + "^{-1.154}\\times " + $("#age").val() + "^{-0.203}\\times 1.210      \\]";


            } else if (($("#genderSwitch input[type='radio']:checked").val() != "female") && ($("#raceSwitch input[type='radio']:checked").val() != "black")) {
                GFR = 186 * Math.pow($("#scr").val(), -1.154) * Math.pow($("#age").val(), -0.203);
                GFR = Math.round(GFR * 10) / 10;
                EquationResult = "\\[    " + GFR + " = 186 \\times " + $("#scr").val() + "^{-1.154}\\times " + $("#age").val() + "^{-0.203}    \\]";


            }
        }

        else if (GFRmode == "ckdepi") {
            $('#ckdepi').removeClass("inactivebutton").addClass("activebutton");
            if (($("#genderSwitch input[type='radio']:checked").val() == "female") && ($("#raceSwitch input[type='radio']:checked").val() == "black")) {
                if (($("#scr").val() / 0.7 ) < 1) {
                    GFR = 141 * Math.pow(($("#scr").val() / 0.7), -0.329) * Math.pow(1, -1.209) * Math.pow(0.993, $("#age").val()) * 1.018 * 1.159;
                    GFR = Math.round(GFR * 10) / 10;
                    EquationResult = "\\[     " + GFR + " \\approx ClCr = 141 \\times (" + $("#scr").val() + "/0.7)^{-0.329}  \\times 1^{-1.209} \\times 0.993^{" + $("#age").val() + "} \\times [1.018]    \\times [1.159]      \\]";
                } else {
                    GFR = 141 * Math.pow(1, -0.329) * Math.pow(($("#scr").val() / 0.7), -1.209) * Math.pow(0.993, $("#age").val()) * 1.018 * 1.159;
                    GFR = Math.round(GFR * 10) / 10;
                    EquationResult = "\\[     " + GFR + " \\approx ClCr = 141 \\times 1^{-0.329}  \\times (" + $("#scr").val() + "/0.7)^{-1.209} \\times 0.993^{" + $("#age").val() + "} \\times [1.018]    \\times [1.159]      \\]";
                }

            } else if (($("#genderSwitch input[type='radio']:checked").val() == "female") && ($("#raceSwitch input[type='radio']:checked").val() != "black")) {
                if (($("#scr").val() / 0.7 ) < 1) {
                    GFR = 141 * Math.pow(($("#scr").val() / 0.7), -0.329) * Math.pow(1, -1.209) * Math.pow(0.993, $("#age").val()) * 1.018;
                    GFR = Math.round(GFR * 10) / 10;
                    EquationResult = "\\[     " + GFR + " \\approx ClCr = 141 \\times (" + $("#scr").val() + "/0.7)^{-0.329}  \\times 1^{-1.209} \\times 0.993^{" + $("#age").val() + "} \\times [1.018]        \\]";
                } else {
                    GFR = 141 * Math.pow(1, -0.329) * Math.pow(($("#scr").val() / 0.7), -1.209) * Math.pow(0.993, $("#age").val()) * 1.018;
                    GFR = Math.round(GFR * 10) / 10;
                    EquationResult = "\\[     " + GFR + " \\approx ClCr = 141 \\times 1^{-0.329}  \\times (" + $("#scr").val() + "/0.7)^{-1.209} \\times 0.993^{" + $("#age").val() + "} \\times [1.018]           \\]";
                }

            } else if (($("#genderSwitch input[type='radio']:checked").val() != "female") && ($("#raceSwitch input[type='radio']:checked").val() == "black")) {
                if (($("#scr").val() / 0.9 ) < 1) {
                    GFR = 141 * Math.pow(($("#scr").val() / 0.9), -0.411) * Math.pow(1, -1.209) * Math.pow(0.993, $("#age").val()) * 1.159;
                    GFR = Math.round(GFR * 10) / 10;
                    EquationResult = "\\[     " + GFR + " \\approx ClCr = 141 \\times (" + $("#scr").val() + "/0.9)^{-0.411}  \\times 1^{-1.209} \\times 0.993^{" + $("#age").val() + "}      \\times [1.159]      \\]";
                } else {
                    GFR = 141 * Math.pow(1, -0.411) * Math.pow(($("#scr").val() / 0.9), -1.209) * Math.pow(0.993, $("#age").val()) * 1.159;
                    GFR = Math.round(GFR * 10) / 10;
                    EquationResult = "\\[     " + GFR + " \\approx ClCr = 141 \\times 1^{-0.411}  \\times (" + $("#scr").val() + "/0.9)^{-1.209} \\times 0.993^{" + $("#age").val() + "}     \\times [1.159]      \\]";
                }

            } else if (($("#genderSwitch input[type='radio']:checked").val() != "female") && ($("#raceSwitch input[type='radio']:checked").val() != "black")) {
                if (($("#scr").val() / 0.9 ) < 1) {
                    GFR = 141 * Math.pow(($("#scr").val() / 0.9), -0.411) * Math.pow(1, -1.209) * Math.pow(0.993, $("#age").val());
                    GFR = Math.round(GFR * 10) / 10;
                    EquationResult = "\\[     " + GFR + " \\approx ClCr = 141 \\times (" + $("#scr").val() + "/0.9)^{-0.411}  \\times 1^{-1.209} \\times 0.993^{" + $("#age").val() + "}      \\]";
                } else {
                    GFR = 141 * Math.pow(1, -0.411) * Math.pow(($("#scr").val() / 0.9), -1.209) * Math.pow(0.993, $("#age").val());
                    GFR = Math.round(GFR * 10) / 10;
                    EquationResult = "\\[     " + GFR + " \\approx ClCr = 141 \\times 1^{-0.411}  \\times (" + $("#scr").val() + "/0.9)^{-1.209} \\times 0.993^{" + $("#age").val() + "}      \\]";
                }

            }
        }

        else if (GFRmode == "children") {
            $('#children').removeClass("inactivebutton").addClass("activebutton");
            if ($("#pediatricage").val() < 1) {
                $('#pretermSwitch').show();
                if ($("#pretermSwitch input[type='radio']:checked").val() == "Pre-Term") {
                    GFR = 0.33 * $("#height").val() / $("#scr").val();
                    GFR = Math.round(GFR * 10) / 10;
                    EquationResult = "\\[    " + GFR + " \\approx ClCr =  \\frac{" + 0.33 + "\\times " + $("#height").val() + "}{" + $("#scr").val() + "}    \\]";
                }
                else {
                    GFR = 0.45 * $("#height").val() / $("#scr").val();
                    GFR = Math.round(GFR * 10) / 10;
                    EquationResult = "\\[    " + GFR + " \\approx ClCr =  \\frac{" + 0.45 + "\\times " + $("#height").val() + "}{" + $("#scr").val() + "}    \\]";
                }
            }
            else {
                $('#pretermSwitch').hide();
                GFR = 0.55 * $("#height").val() / $("#scr").val();
                GFR = Math.round(GFR * 10) / 10;
                EquationResult = "\\[    " + GFR + " \\approx ClCr =  \\frac{" + 0.55 + "\\times " + $("#height").val() + "}{" + $("#scr").val() + "}    \\]";
            }
        }


        $("#EquationResult").text(EquationResult);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "EquationResult"]);

    }


    // Post-initialization interface (e.g., buttons)
    $('#genderSwitch').click(function () {
        initializeEquation();
        updateEquation();

    });

    $('#raceSwitch').click(function () {
        initializeEquation();
        updateEquation();
    });

    $('#pretermSwitch').click(function () {
        initializeEquation();
        updateEquation();
    });

    $('#measured').click(function () {
        $.cookie('GFRmode', 'measured');
        resetButtons();
        $('#time_input').show();
        $('#urineVolume_input').show();
        $('#ucr_input').show();
        $('#scr_input').show();
        $('.urineCollection').show();
        updateEquation();
    });


    $('#cg').click(function () {
        $.cookie('GFRmode', 'cg');
        resetButtons();
        $('#cg').removeClass("inactivebutton").addClass("activebutton");
        $('#genderSwitch').show();
        $('#age_input').show();
        $('#ibw_input').show();
        $('#scr_input').show();
        updateEquation();
    });

    $('#mdrd').click(function () {
        $.cookie('GFRmode', 'mdrd');
        resetButtons();
        $('#mdrd').removeClass("inactivebutton").addClass("activebutton");
        $('#genderSwitch').show();
        $('#raceSwitch').show();
        $('#age_input').show();
        $('#scr_input').show();
        updateEquation();

    });


    $('#ckdepi').click(function () {
        $.cookie('GFRmode', 'ckdepi');
        resetButtons();
        $('#ckdepi').removeClass("inactivebutton").addClass("activebutton");
        $('#genderSwitch').show();
        $('#raceSwitch').show();
        $('#age_input').show();
        $('#scr_input').show();
        $('#ckdepi_variables').show();
        updateEquation();

    });


    $('#children').click(function () {
        $.cookie('GFRmode', 'children');
        resetButtons();
        $('#children').removeClass("inactivebutton").addClass("activebutton");
        $('#pediatricage_input').show();
        $('#scr_input').show();
        $('#height_input').show();
        updateEquation();
    });


    $("#slider-age").slider({
        animate: "fast",
        min: 21,
        max: 100,
        step: 1,
        value: 45,
        change: function (event, ui) {
        },
        slide: function (event, ui) {
            $("#age").val(ui.value);
            updateEquation();
        }
    });
    $("#age").val($("#slider-age").slider("value"));


    $("#slider-pediatricage").slider({
        animate: "fast",
        min: 0.1,
        max: 12,
        step: 0.1,
        value: 0.9,
        change: function (event, ui) {
        },
        slide: function (event, ui) {
            $("#pediatricage").val(ui.value);
            updateEquation();
        }
    });
    $("#pediatricage").val($("#slider-pediatricage").slider("value"));


    $("#slider-scr").slider({
        animate: "fast",
        min: 0.1,
        max: 10,
        step: 0.1,
        value: 1,
        slide: function (event, ui) {
            $("#scr").val(ui.value);
            updateEquation();
        },

    });
    $("#scr").val($("#slider-scr").slider("value"));


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


    $("#slider-height").slider({
        animate: "fast",
        min: 30,
        max: 200,
        step: 1,
        value: 100,
        slide: function (event, ui) {
            $("#height").val(ui.value);
            updateEquation();
        },

    });
    $("#height").val($("#slider-height").slider("value"));


    $("#slider-ucr").slider({
        animate: "fast",
        min: 1,
        max: 400,
        step: 1,
        value: 100,
        slide: function (event, ui) {
            $("#ucr").val(ui.value);
            var opPercent = $("#ucr").val() / 400;
            $('#urine').css("opacity", opPercent);
            updateEquation();
        },

    });
    $("#ucr").val($("#slider-ucr").slider("value"));


    $("#slider-time").slider({
        animate: "fast",
        min: 1,
        max: 72,
        step: 1,
        value: 24,
        slide: function (event, ui) {
            $("#time").val(ui.value);
            updateEquation();
        },

    });
    $("#time").val($("#slider-time").slider("value"));


    $("#slider-urineVolume").slider({
        animate: "fast",
        min: 1,
        max: 3000,
        step: 5,
        value: 1000,
        slide: function (event, ui) {
            $("#urineVolume").val(ui.value);
            var percent = $("#urineVolume").val() / 3000;
            var top = percent * -220;
            $('#urine').css("top", top);
            $('#urine').css("height", (-1 * top) - 10);
            updateEquation();
        }

    });
    $("#urineVolume").val($("#slider-urineVolume").slider("value"));


    // Should be in initialization


    updateEquation();
    // Should be in initialization 


});
 
 
 
 
 
 


