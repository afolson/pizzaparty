// Tooltips
Chart.defaults.global.customTooltips = function(tooltip) {
    // Tooltip Element
    var tooltipEl = $('#chartjs-tooltip');

    // Hide if no tooltip
    if (!tooltip) {
        tooltipEl.css({
            opacity: 0
        });
        return;
    }

    // Set caret Position
    tooltipEl.removeClass('above below');
    tooltipEl.addClass(tooltip.yAlign);

    // Set Text
    tooltipEl.html(tooltip.text);

    // Find Y Location on page
    var top;
    if (tooltip.yAlign == 'above') {
        top = tooltip.y - tooltip.caretHeight - tooltip.caretPadding;
    } else {
        top = tooltip.y + tooltip.caretHeight + tooltip.caretPadding;
    }

    // Display, position, and set styles for font
    tooltipEl.css({
        opacity: 1,
        left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
        top: tooltip.chart.canvas.offsetTop + top + 'px',
        fontFamily: tooltip.fontFamily,
        fontSize: tooltip.fontSize,
        fontStyle: tooltip.fontStyle,
    });
};

var options = {
    segmentShowStroke: false,
    animateRotate: true,
    animateScale: false,
    // Uncomment to play with custom legend templating
    //legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    // Uncomment this to make it a donut!
    //percentageInnerCutout: 50,
}

// Pizza math. One giant function because #yolo
function makeMePizza(){
    // I randomized the data/colors at first. Leaving this here in case someone else needs it.
    //var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
    //var randomColorFactor = function(){ return Math.round(Math.random()*255)};

    /*
        Let's do some mathing.
        The cheese pizza count is rounded up so that we order at least one pizza. 
        Cheese seems like a safe choice.
    */
    var partycount = document.getElementById('partycount').value;
    var pizzacount = Math.ceil(partycount * 3/8);
    var cheesecount = Math.ceil(0.30 * pizzacount); // 30%
    var pepperonicount = Math.floor(0.20 * pizzacount); // 20%
    var veggiecount = Math.floor(0.20 * pizzacount); // 20%
    var specialcount = Math.floor(0.15 * pizzacount); // 15%
    var specialcount2 = Math.floor(0.15 * pizzacount); // 15%

    // The formula above gives us a rough idea, but now we make the mathing
    var actualcount = cheesecount + pepperonicount + veggiecount + specialcount + specialcount2;

    // Awww yissssss pizza
    var data = [
                {
                    value: pepperonicount,
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: "Pepperoni"
                },
                {
                    value: veggiecount,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Veggie"
                },
                {
                    value: cheesecount,
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Cheese"
                },
                {
                    value: specialcount,
                    color: "#949FB1",
                    highlight: "#A8B3C5",
                    label: "Local Specialty"
                },
                {
                    value: specialcount2,
                    color: "#4D5360",
                    highlight: "#616774",
                    label: "Second Local Specialty"
                }

            ];

    // There might be a prettier way to do this, but what do you want...it's a hack day project.
    document.getElementById('partypeople').innerHTML = actualcount;
    document.getElementById('letsparty').style.display = "none";
    document.getElementById('pizzaparty').style.display = "block";
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx).Pie(data, options);
    document.getElementById('js-legend').innerHTML = myChart.generateLegend();

    // Leave me alone.
    return false;
}
