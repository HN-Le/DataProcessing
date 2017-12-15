function makeGroupBarchart(dataTotaal, dataGroep, data2013, data2014, data2015, data2016, data2017){

	var colourID;
	var barID;
	var categoryID;
	var yearID;
	var data;
	var categoryText = []
	var categoryYear = ["2013", "2014", "2015", "2016", "2017"]

    var svg = d3.select("#group"),
        margin = {top: 100, right: 300, bottom: 150, left: 50},
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

	var keys = dataTotaal.columns.slice(2);

	x0.domain(dataTotaal.map(function(d) { return d.Perioden; }));
	x1.domain(keys).rangeRound([0, x0.bandwidth()]);
	y.domain([0, 100]);

	var colour = d3.scaleOrdinal(d3.schemeCategory10);

	// Tooltip
    var div = d3.select("body").append("div")
	.attr("id" , "tooltip")
    .attr("class", "hidden")

	var category = d3.select("div").append("p")
	.attr("id", "category")

	var values = d3.select("div").append("p")
	.attr("id", "value")

        chart.append("g")
          .selectAll("g")
          .data(dataTotaal)
          .enter().append("g")
		  	.attr("class", "groupBar")
			.attr("id", function(d,i) { barID = i; return i } )
            .attr("transform", function(d) { return "translate(" + x0(d.Perioden) + ",0)"; })
          .selectAll(".bar")
          .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
          .enter().append("rect")
		  	.attr("class", "bar")
			.attr("id", function(d,i) { yearID = i; return i; } )
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return colour(d.key); })
            .attr("dy", function(d) { return d.value; })
            .on("mouseover", function(d) {
				d3.select("#tooltip")
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY) + "px")
				.select("#value")
				.text(d.value + "%");

				d3.select("#tooltip")
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY) + "px")
				.select("#category")
				.text(d.key);

				d3.select("#tooltip").classed("hidden", false);
               })

			.on("mouseout", function() {

				d3.select("#tooltip").classed("hidden", true);
				})
			.on("click", function(d,i) {

				colourID = colour(d.key);

				categoryID = d3.select(this).attr("id");
				yearID = d3.select(this.parentNode).attr("id");

				retrieveClickedData(yearID, categoryID, colourID);

				if (yearID ==0){
					data = data2013
					console.log("2013");
				}

				else if (yearID == 1) {
					data = data2014
					console.log("2014");
				}

				else if (yearID == 2) {
					data = data2015
					console.log("2015");
				}

				else if (yearID == 3) {
					data = data2016
					console.log("2016");
				}

				else {
					data = data2017
					console.log("2017");
				}

				update(data, categoryID, colourID, categoryText, categoryYear)

			})

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
            .text(function(d) { categoryText.push(d); return d; });

        // Make tittle
        chart.append("text")
            .attr("x", (width / 2))
            .attr("y", 10 - (margin.top / 2))
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .text("Internet faciliteiten in Nederlandse huishoudens");

}
