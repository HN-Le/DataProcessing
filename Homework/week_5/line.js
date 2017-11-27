/*
Dataprocessing
Week 5: D3 Line

Tiny Le
11130717

Creating an interactive multiline graph

Sources:


Dataset:
http://projects.knmi.nl/klimatologie/daggegevens/selectie.cgi


Path:
D:\Code\GitHub\DataProcessing\Homework\week_5
python -m SimpleHTTPServer 8888 &

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

    var lineLelystad = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.averageLelystad); })

    var lineMaastricht  = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.averageMaastricht); })

    var colour = d3.scale.category10();

    // Initialize the graph
    var svg = d3.select(".graph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Covert strings to numbers
    data.forEach(function(d) {
        d.averageLelystad = +d.averageLelystad;
        d.averageMaastricht = +d.averageMaastricht;
        d.date = parseTime(d.date);
        });

    x.domain(d3.extent(data, function(d) { return d.date; }));

    y.domain(d3.extent(data, function(d) { return d.averageLelystad; })).nice();

    // Makes axes
    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (height*0.75) + ")")
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

    // Make Lelystad line
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .style("stroke", function(d) { return colour("Average Temp Lelystad"); })
        .attr("d", lineLelystad);

    // Make Maastricht line
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .style("stroke", function(d) { return colour("Average Temp Maastricht"); })
        .attr("d", lineMaastricht);

    // Initialize the legend
    var legend = svg.selectAll(".legend")
        .data(colour.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // Make the legend squares and fill them with one of the colours in colour pack
    legend.append("rect")
        .attr("x", width - 40)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", colour);

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
        .text("Lelystad VS Maastricht");

}
