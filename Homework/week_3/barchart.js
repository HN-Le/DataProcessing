/*
Data Processing
Week 3: Interactive Bar Chart with D3

Tiny Le
11130717

Sources:
D3:
http://www.jeromecukier.net/blog/2013/03/05/d3-tutorial-at-strata-redux/
https://bost.ocks.org/mike/bar/2
https://bost.ocks.org/mike/bar/3
https://github.com/Caged/d3-tip
http://www.d3noob.org/2014/05/including-html-link-in-d3js-tool-tip.html
http://www.d3noob.org/2013/01/adding-title-to-your-d3js-graph.html

Dataset:
http://projects.knmi.nl/klimatologie/daggegevens/selectie.cgi

*/

// Clickable link to source dataset
d3.select("body").append("p").html("First lines").attr("id", "source");
d3.select("#source")
.html('<a href = "https://projects.knmi.nl/klimatologie/daggegevens/selectie.cgi">'
        + "Source: KNMI</a>");

// Only draw the barchart when all the data is loaded
ifLoaded(drawChart);

// Callback for when data is loaded
function ifLoaded(callback){
    d3.json("knmi.json", function (data){
        callback(data);
    });
}

// Function to draw the bar chart
function drawChart(data){

    // Define the properties for the four sides of the chart
    var margin = {top: 20, right: 100, bottom: 30, left: 40},
        width = 1200 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // Define properties for the x axe
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // Define properties for the y axe
    var y = d3.scale.linear()
        .range([height, 0]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // Initialize tooltip
    var toolTip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) {return "Amount: <span style='color:white'>" + d.amount + "</span>"; })

    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Call the tooltip onto the chart to show amount when mouse hovers over a bar
    chart.call(toolTip);

    x.domain(data.map(function(d) { return d.date; }));
    y.domain([0, 250]);

    // Make X axes and labels
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", 1100)
        .attr("dy", "-0.71em")
        .style("text-anchor", "end")
        .style("font-size", "15px")
        .text("Date");

    // Make Y axes and labels
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "15px")
        .text("Amount of rain in mm");

    // Make the bars and set the action of when the mouse hovers a bar
    chart.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.amount); })
        .attr("height", function(d) { return height - y(d.amount); })
        .attr("width", x.rangeBand())
        .on('mouseover', toolTip.show)
        .on('mouseout', toolTip.hide)

    // Add bar chart title
    chart.append("text")
        .attr("x", (width / 2))
        .attr("y", 10 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Amount of rain in the last two weeks of November 2015 ");
}

// Type conversion function, modifies/converts object for beter representation
function type(d) {
    d.amount = +d.amount;
    return d;
}
