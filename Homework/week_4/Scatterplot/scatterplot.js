/*
Dataprocessing
Week 4: Scatterplot

Tiny Le
11130717

Creating a scatterplot to visualize a dataset
        X Axes : Represent Wellbeing
        Y Axes: Represent the Happy Planet Index
        Colours: Represent in which region the country lies
        Size of dot: Represent the ecological footprint of the country

Sources:
http://bl.ocks.org/aaizemberg/78bd3dade9593896a59d
https://bl.ocks.org/mbostock/3887118

Dataset:
http://happyplanetindex.org/countries
*/

// Display all non scatterplot text
showText()

// Only make scatterplot when data is loaded
ifLoaded(drawPlot)

// Function to display all non scatterplot text
function showText(){
    // Display text to explain variables and goal of the index
    d3.select("body").append("p").html("First lines").attr("id", "info");
    d3.select("#info")
                .html(
                '<b>' + 'Happy Planet Index Rank (Out of 140 countries):' + '</b>' + ' The higher the number, the higher the rank among countries.' + '<br>' +
                '<b>' + 'Happy Planet Index:' + '</b>' + ' The higher the number, the higher the sustainable wellbeing.' + '<br>' +
                '<b>' + 'Wellbeing (Scale 0-10):' + '</b>' +  ' The higher the number, the higher the life satisfaction.' + '<br>' +
                '<b>' + 'Ecological footprint (Size of dot):' + '</b>' + ' The smaller the dot, the lower the negative environmental impact.' + '<br>' + '<br>' +
                '<i>' + ' " The Happy Planet Index measures what matters: sustainable wellbeing for all.' + '<br>' +
                'It tells us how well nations are doing at achieving long, happy, sustainable lives. "' + '</i>' + '<br>'
                );

    // Clickable link to source dataset
    d3.select("body").append("p").html("Second lines").attr("id", "source");
    d3.select("#source")
                .html('<a href = "http://happyplanetindex.org/countries">'
                            + "Source: New Economics Foundation</a>");

    // Display text to show name and studentnumber
    d3.select("body").append("p").html("Third lines").attr("id", "name");
    d3.select("#name")
                .html('Scatterplot made by: Tiny Le (11130717)');
}

// Callback for when data is loaded
function ifLoaded(callback){

    d3.json("data.json", function (data){

        // Error handeling, if data could not load
        if (!data){
            console.log("ERROR, could not load data")
        }

        // If everything goes well
        else{
            callback(data);
        }
    });
}

// Function to draw the scatterplot
function drawPlot(data){

    // Margins for the plot
    var margin = { top: 100, right:100, bottom: 30, left: 80},
    width = 1300 - margin.left - margin.right,
    height = 700 - margin.bottom - margin.top;

    // Properties for the X and Y axes
    var x = d3.scale.linear()
            .range([0, width]);

    var y = d3.scale.linear()
            .range([height, 0]);

    // Choose a color pack
    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // Initialize the plot
    var svg = d3.select(".scatterplot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Covert strings to numbers
    data.forEach(function(d) {
        d.happyPlanetIndex = +d.happyPlanetIndex;
        d.wellBeing = +d.wellBeing;
        d.footPrint = +d.footPrint;
        });

    // Initialize tooltip
    var toolTip = d3.tip()
        .attr('class', 'd3-tip')

        // Show the variables with their data in the popup
        .html(function(d) {return d.country + "<span style='color:white'>" +  "</span>" + "<br>"
                + "HPI rank: " + "<span style='color:white'>" + d.rank + "</span>" + "<br>"
                + "HPI: " + "<span style='color:white'>" + d.happyPlanetIndex + "</span>" + "<br>"
                + "Wellbeing: " + "<span style='color:white'>" + d.wellBeing + "</span>" + "<br>"
                + "Footprint: " + "<span style='color:white'>" + d.footPrint + "</span>" + "<br>"
                + "Region: " + "<span style='color:white'>" + d.region + "</span>"
                ;})

    // Properties for the size of the axes
    x.domain(d3.extent(data, function(d) { return d.wellBeing; })).nice();
    y.domain(d3.extent(data, function(d) { return d.happyPlanetIndex; })).nice();

    // Call the tooltip onto the chart to show data when mouse hovers over a dot
    svg.call(toolTip);

    // Make the labels of the x and y axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Wellbeing");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Happy Planet Index")

    // Make the dots and attach the tooltip
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function (d) {return d.footPrint})
        .attr("cx", function(d) { return x(d.wellBeing); })
        .attr("cy", function(d) { return y(d.happyPlanetIndex); })
        .style("fill", function(d) { return color(d.region); })
        .on('mouseover', toolTip.show)
        .on('mouseout', toolTip.hide)

    // Initialize the legend
    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // Make the legend squares and fill them with one of the colours in colour pack
    legend.append("rect")
        .attr("x", width - 40)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    // Make the legend texts
    legend.append("text")
        .attr("x", width - 50)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

    // Make the scatterplot tittle
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 10 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Happy Planet Index Scatterplot");
}
