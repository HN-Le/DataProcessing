/*
	Dataprocessing
	Tiny Le
	11130717

	Week 6: Linked Views
	Creating a linked views visualization

	Aim is to make a general group barchart about the data and when clicked on a bar, that specific group will be viewed
	in the bar chart below for that year.

	Still lots to be done ...

	- Functioning linked view
	- Bootstrap
	- All text (extra info, etx)
	- Source linking
	- Design report
	- Proper commenting
	- Layout

	 Data Source:
	 http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=83429NED&D1=0,2-5&D2=0,3-6&D3=0&D4=a&HDR=T&STB=G1,G2,G3&VW=T

	 Resources used:
	 https://bl.ocks.org/mbostock/3887051
	 http://bl.ocks.org/mapsam/6090056
	 https://bl.ocks.org/d3noob/257c360b3650b9f0a52dd8257d7a2d73
	 https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/pageX
	 https://bl.ocks.org/mbostock/3808218
	 https://bl.ocks.org/hrecht/f84012ee860cb4da66331f18d588eee3
*/

queue()
	.defer(d3.csv, 'totaal.csv')
	.defer(d3.csv, 'groep.csv')
	.await(makeGroupBarchart)

function makeGroupBarchart(error, dataTotaal, dataGroep){

    var svg = d3.select("svg"),
        margin = {top: 100, right: 300, bottom: 30, left: 100},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var chart = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Distance between groups of bars
    var x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.2);

    // Distance between bars
    var x1 = d3.scaleBand()
        .padding(0.2);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var colour = d3.scaleOrdinal(d3.schemeCategory10);

	// Tooltip
    var div = d3.select("body").append("div")
    .attr("class", "tooldiv")
    .style("opacity", 0);

    dataTotaal.forEach(function(d) {
        d["Toegang tot internet"] = +d["Toegang tot internet"];
        d["Personal Computer (PC) of desktop"] = +d["Personal Computer (PC) of desktop"];
        d["Laptop of netbook"] = +d["Laptop of netbook"];
        d["Tablet"] = +d["Tablet"];
        d["Mobiele telefoon of smartphone"] = +d["Mobiele telefoon of smartphone"];
        });

        var keys = dataTotaal.columns.slice(2);

        x0.domain(dataTotaal.map(function(d) { return d.Perioden; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, 100]);

        chart.append("g")
          .selectAll("g")
          .data(dataTotaal)
          .enter().append("g")
            .attr("transform", function(d) { return "translate(" + x0(d.Perioden) + ",0)"; })
          .selectAll("rect")
          .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
          .enter().append("rect")
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return colour(d.key); })
            .attr("dy", function(d) { return d.value; })
            .on("mouseover", function(d) {
				div.transition()
					.style("opacity", .9);
				div.html(d.key + "<br/>" + d.value + "<span>" + "%" + "</span>")
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY) + "px");
               })
			.on("mouseout", function(d) {
				div.transition()
					.style("opacity", 0);
				});

        chart.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));

        chart.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "start")
            .text("% van de bevolking heeft ");

        var legend = chart.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width + margin.right - 80)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", colour);

        legend.append("text")
            .attr("x", width + margin.right - 100)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });

        // Make tittle
        chart.append("text")
            .attr("x", (width / 2))
            .attr("y", 10 - (margin.top / 2))
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .text("Internet faciliteiten in Nederlandse huishoudens");

		var svgSub = d3.select("#barchart"),
	        marginSub = {top: 10, right: 300, bottom: 50, left: 100},
	        widthSub = +svg.attr("width") - marginSub.left - marginSub.right,
	        heightSub = +svg.attr("height") - marginSub.top - marginSub.bottom;

	    var chartSub = svgSub.append("g").attr("transform", "translate(" + marginSub.left + "," + marginSub.top + ")");

		// Define properties for the x axe
	    var xBarchart = d3.scaleBand()
						.range ([0, widthSub])
						.padding (0.1);

	    // Define properties for the y axe
	    var yBarchart = d3.scaleLinear()
	        			.range([heightSub, 0]);


	var keys4 = dataGroep.columns.slice(1);

		dataGroep.forEach(function(d) {
	        d["Toegang tot internet"] = +d["Toegang tot internet"];
	        d["Personal Computer (PC) of desktop"] = +d["Personal Computer (PC) of desktop"];
	        d["Laptop of netbook"] = +d["Laptop of netbook"];
	        d["Tablet"] = +d["Tablet"];
	        d["Mobiele telefoon of smartphone"] = +d["Mobiele telefoon of smartphone"];
	        });

		// Set dimentions of the axes
	    xBarchart.domain(dataGroep.map(function(d) { return d["Kenmerken personen"]; }));
	    yBarchart.domain([0, 100]);

		var keysSub = dataGroep.columns.slice(2);

		chartSub.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + heightSub + ")")
            .call(d3.axisBottom(xBarchart));

        chartSub.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(yBarchart).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", yBarchart(yBarchart.ticks().pop()) + 0.1)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("% van de heeft ");

}
