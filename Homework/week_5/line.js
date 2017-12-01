/*
Dataprocessing
Week 5: D3 Line

Tiny Le
11130717

Creating an interactive multiline graph

Sources:
    http://bl.ocks.org/d3noob/5d621a60e2d1d02086bf
    http://tributary.io/inlet/8677777
    https://github.com/d3/d3-time-format#timeFormat
    https://bl.ocks.org/alandunning/cfb7dcd7951826b9eacd54f0647f48d3
    https://bl.ocks.org/mbostock/3884955
    https://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js-part-2--cms-22973
    http://bl.ocks.org/mikehadlow/93b471e569e31af07cd3

Dataset:
    http://projects.knmi.nl/klimatologie/daggegevens/selectie.cgi
*/

showText();

ifDataLoaded(drawGraph);

// Callback for when data is loaded
function ifDataLoaded(callback){

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
                .html("Click on the city name to toggle that data on/off!");

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

    var margin = {top: 100, right: 200, bottom: 30, left: 80},
        width = 1200 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

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

    // Set properties lines
    var lineLelystad = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.averageLelystad); })

    var lineMaastricht  = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.averageMaastricht); })

    // Colour pack
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

    var xDomain = d3.extent(data, function(d) { return d.date; });
    var yDomain = d3.extent(data, function(d) { return d.averageLelystad; });

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
        .text("Temperature in ºC");

    // Make Lelystad line
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .style("stroke", function(d) { return colour("Average Temp Lelystad"); })
        .attr('class', 'lelyLine')
        .attr('id', 'lely')
        .attr("d", lineLelystad)

    // Make Maastricht line
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .style("stroke", function(d) { return colour("Average Temp Maastricht"); })
        .attr('class', 'maasLine')
        .attr('id', 'maas')
        .attr("d", lineMaastricht);

    // Make dots
    svg.selectAll('lelystad')
                .data(data).enter()
                .append('circle')
                .attr('cx', function(d) { return x(d.date); })
                .attr('cy', function(d) { return y(d.averageLelystad); })
                .attr('r', 3)
                .attr('class', 'lelystad')
                .attr('id', 'lelyDot')
                .style("fill", function(d) { return colour("Average Temp Lelystad"); })

   svg.selectAll('maastricht')
                .data(data).enter()
                .append('circle')
                .attr('cx', function(d) { return x(d.date); })
                .attr('cy', function(d) { return y(d.averageMaastricht); })
                .attr('r', 3)
                .attr('class', 'maastricht')
                .attr('id', 'maasDot')
                .style("fill", function(d) { return colour("Average Temp Maastricht"); })

    // Make the list and set a listener for Lelystad
    svg.append("text")
        .attr('x', 50 )
        .attr('y', 0)
        .attr('id', 'lelyButton')
        .style("fill", function(d) { return colour("Average Temp Lelystad"); } )
        .on("click", function(){
    		// Check if line is visible or not
    		var active   = lely.active ? false : true ,
    		  newOpacity = active ? 0 : 1;

    		// Hide or show the elements
    		d3.select("#lely").style("opacity", newOpacity);
            d3.selectAll("#lelyDot").style("opacity", newOpacity);
            d3.select("#infoLely").style("opacity", newOpacity);
            d3.select("#focusLineXL").style("opacity", newOpacity);
            d3.select("#focusLineYL").style("opacity", newOpacity);
            d3.select("#focusCircleL").style("opacity", newOpacity);

    		// Update depending on element state
    		lely.active = active;
            })

            .text("LELYSTAD");

        // Make the list and set a listener for Maastricht
        svg.append("text")
            .attr('x', 150 )
            .attr('y', 0)
            .attr('id', 'maasButton')
            .style("fill", function(d) { return colour("Average Temp Maastricht"); })
            .on("click", function(){

        		// Check if line is visible or not
        		var active   = maas.active ? false : true ,
        		  newOpacity = active ? 0 : 1;

        		// Hide or show the elements
        		d3.select("#maas").style("opacity", newOpacity);
                d3.select("#infoMaas").style("opacity", newOpacity);
                d3.selectAll("#maasDot").style("opacity", newOpacity);
                d3.select("#focusLineXM").style("opacity", newOpacity);
                d3.select("#focusLineYM").style("opacity", newOpacity);
                d3.select("#focusCircleM").style("opacity", newOpacity);

        		/// Update depending on element state
        		maas.active = active;
            })

            .text("MAASTRICHT");

    // Make the scatterplot tittle
    svg.append("text")
        .attr("y", 10 - (margin.top / 2))
        .attr("text-anchor", "start")
        .attr('id', 'title')
        .style("font-size", "20px")
        .text("The average Temperatures in Lelystad & Maastricht");

    // Make the cross hair and make it follow the mouse
    var focus = svg.append('g').style('display', 'none');

            focus.append('line')
                .attr('id', 'focusLineXL')
                .attr('class', 'focusLine');
            focus.append('line')
                .attr('id', 'focusLineYL')
                .attr('class', 'focusLine');
            focus.append('circle')
                .attr('id', 'focusCircleL')
                .attr('r', 3)
                .attr('class', 'circle focusCircle');

            focus.append('line')
                .attr('id', 'focusLineXM')
                .attr('class', 'focusLine');
            focus.append('line')
                .attr('id', 'focusLineYM')
                .attr('class', 'focusLine');
            focus.append('circle')
                .attr('id', 'focusCircleM')
                .attr('r', 3)
                .attr('class', 'circle focusCircle');

            focus.append("text")
            .attr('id', 'dateText')


            focus.append("text")
            .attr('id', 'infoLely')


            focus.append("text")
            .attr('id', 'infoMaas')


            focus.append("rect")
            .attr('id', 'box')

            // Function to return the index left of a data point
            var bisectDate = d3.bisector(function(d) { return d.date; }).left;

            svg.append('rect')
                .attr('class', 'overlay')
                .attr('width', width)
                .attr('height', height)
                .on('mouseover', function() { focus.style('display', null); })
                .on('mouseout', function() { focus.style('display', 'none'); })
                .on('mousemove', function() {
                    var mouse = d3.mouse(this);
                    var mouseDate = x.invert(mouse[0]);

                    // returns the index to the current data item
                    var i = bisectDate(data, mouseDate);

                    var d0 = data[i - 1].averageLelystad
                    var d1 = data[i].averageLelystad;

                    var d1 = data[i - 1].averageMaastricht
                    var d2 = data[i].averageMaastricht;

                    // work out which date value is closest to the mouse
                    mouseDate - d0[0] > d1[0] - mouseDate ? d1 : d0;
                    mouseDate - d1[0] > d2[0] - mouseDate ? d2 : d1;

                    // X coordinate date
                    var a = x(data[i].date);

                    // Y coordinate cities
                    var b = y(data[i].averageLelystad);
                    var c = y(data[i].averageMaastricht);

                    // Set the x and y values based cloest data point mouse
                    focus.select('#focusCircleL')
                        .attr('cx', a)
                        .attr('cy', b);

                    focus.select('#focusCircleM')
                        .attr('cx', a)
                        .attr('cy', c);

                    focus.select('#focusLineXL')
                        .attr('x1', a).attr('y1', -height)
                        .attr('x2', a).attr('y2', height);

                    focus.select('#focusLineXM')
                        .attr('x1', a).attr('y1', -height)
                        .attr('x2', a).attr('y2', height);

                    focus.select('#focusLineYL')
                        .attr('x1', -x(i) ).attr('y1', b)
                        .attr('x2', x(i)  ).attr('y2', b);

                    focus.select('#focusLineYM')
                        .attr('x1', -x(i) ).attr('y1', c)
                        .attr('x2', x(i) ).attr('y2', c);

                    // To grab the highest line
                    var h = b < c ? b : c;

                    // Formate date to show a more clean date
                    var formateDate = d3.timeFormat("%d-%m-%Y")

                    // Set the position and text of the popup texts
                    focus.select('#dateText')
                        .attr("transform", "translate(" + (a + 20) + "," + (h - 50) + ")");

                    focus.select('#infoLely')
                        .attr("transform", "translate(" + (a + 20) + "," + (h - 30) + ")");

                    focus.select('#infoMaas')
                        .attr("transform", "translate(" + (a + 20) + "," + (h - 10) + ")");

                    focus.select("#dateText")
                        .text(function() { return "Date: " + formateDate(data[i].date); });

                    focus.select("#infoLely")
                        .text(function() { return "Lelystad: " + data[i].averageLelystad; });

                    focus.select("#infoMaas")
                        .text(function() { return "Maastricht: " + data[i].averageMaastricht; });
                });



}
