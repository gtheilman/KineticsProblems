function randrange(minimum, maximum) {
    /* Comes up with a integer value within a range */
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function randNormal(mean, stdev, mantissa) {
    function rnd_snd() {
        return (Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1);
    }

    return (Math.round((rnd_snd() * stdev + mean) * Math.pow(10, mantissa))) / Math.pow(10, mantissa);
}

function randSelect(list) {
    return list[randrange(0, (list.length - 1))];
}


jQuery('#calculator').click(function () {
    var calculatorWindow = new Window({
        template: $('#popupcalculator').html(),
        title: "",
        bodyContent: "<iframe width='320' height='390' src='common/calculator.html' scrolling='no' style='border: 1px solid #silver; '></iframe>"
    });

});

