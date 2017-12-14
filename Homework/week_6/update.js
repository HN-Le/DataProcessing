function update(data){

	var range = [ data[0][0].key, data[0][1].key, data[0][2].key, data[0][3].key ]

	var svgSub = d3.select("#barchart"),
		marginSub = {top: 100, right: 100, bottom: 150, left: 50},
		widthSub = 500 - marginSub.left - marginSub.right,
		heightSub = 600 - marginSub.top - marginSub.bottom;

	var chartSub = svgSub.append("g").attr("transform", "translate(" + marginSub.left + "," + marginSub.top + ")");

	// Define properties for the x axe
	var xBarchart = d3.scaleBand()
					.range([0, widthSub])
					.padding(0.5);

	// Define properties for the y axe
	var yBarchart = d3.scaleLinear()
					.range([heightSub, 0]);

	xBarchart.domain(range)
	yBarchart.domain([0, 100])

	var oldBars = svgSub.selectAll(".bar")
	.remove()
	.exit()

	var newBars = chartSub.selectAll(".bar")

	newBars.data(data[1])
			.enter().append("rect")
			.attr("class", "bar")
			.attr("id", "singleBar")
			.attr("x", function(d) { return xBarchart(d.key); } )
			.attr("width", xBarchart.bandwidth() )
			.attr("y", function(d) { return yBarchart(d.value) } )
			.attr("height", function(d) { return (heightSub - yBarchart(d.value)) } )
			.attr("fill", function(d) { return colour(d.key) } )
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

}
