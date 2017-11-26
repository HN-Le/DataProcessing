/*
Dataprocessing
Week 5: D3 Line

Tiny Le
11130717

Creating an interactive multiline graph

Sources:


Dataset:
http://projects.knmi.nl/klimatologie/daggegevens/selectie.cgi
*/

showText();

ifLoaded(drawGraph);

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

function showText(){
    // Display text to explain variables and goal of the index
    d3.select("body").append("p").html("First lines").attr("id", "info");
    d3.select("#info")
                .html("TO BE CONTINUED");

    // Clickable link to source dataset
    d3.select("body").append("p").html("Second lines").attr("id", "source");
    d3.select("#source")
                .html('<a href = "http://projects.knmi.nl/klimatologie/daggegevens/selectie.cgi">'
                            + "Source: KNMI</a>");

    // Display text to show name and studentnumber
    d3.select("body").append("p").html("Third lines").attr("id", "name");
    d3.select("#name")
                .html('Line graph made by: Tiny Le (11130717)');
}

function drawGraph(data){

    var margin = {top: 100, right: 100, bottom: 30, left: 80},
        width = 1300 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%Y%m%d");

    // Set properties axes
    var x = d3.time.scale()
            .range([0, width]);

    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.averageLelystad); });

    // Choose a color pack
    var color = d3.scale.category10();

    // Initialize the graph
    var svg = d3.select(".graph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Covert strings to numbers
    data.forEach(function(d) {
        d.averageLelystad = +d.averageLelystad;
        d.date = parseTime(d.date);
        });

      x.domain(d3.extent(data, function(d) { return d.date; }));

      y.domain(d3.extent(data, function(d) { return d.averageLelystad; })).nice();

      svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Date");

      svg.append("g")
          .attr("class", "axis axis--y")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("fill", "#000")
          .style("text-anchor", "end")
          .text("Temperature, ºC");

}
