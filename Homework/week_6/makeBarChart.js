function makeBarchart(data, categoryText, categoryYear){

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

	var age = [ data[0][0].key, data[0][1].key, data[0][2].key, data[0][3].key ]

	// Set dimentions of the axes
	    xBarchart.domain(age);
	    yBarchart.domain([0, 100]);

		chartSub.append("g")
	        .attr("class", "axis")
	        .attr("transform", "translate(0," + heightSub + ")")
	        .call(d3.axisBottom(xBarchart))
			.selectAll(".tick text")
				.attr("transform", "rotate(-60)")
				.style("text-anchor", "end")

	    chartSub.append("g")
	        .attr("class", "axis")
	        .call(d3.axisLeft(yBarchart).ticks(null, "s"))
	        .append("text")
		        .attr("x", 1)
		        .attr("y", yBarchart(yBarchart.ticks().pop()) + 0.1)
		        .attr("dy", "0.32em")
		        .attr("fill", "#000")
		        .attr("font-weight", "bold")
		        .attr("transform", "rotate(-90)")
		        .attr("y", 6)
		        .attr("dy", ".71em")
		        .style("text-anchor", "end")
		        .text("% van de heeft ");

		chartSub.selectAll(".bar")
	        .data(data[0])
	        .enter().append("rect")
		        .attr("class", "bar")
				.attr("id", "singleBar")
		        .attr("x", function(d) { return xBarchart(d.key); } )
				.attr("width", xBarchart.bandwidth() )
		        .attr("y", function(d) { return yBarchart(d.value) } )
	            .attr("height", function(d) { return (heightSub - yBarchart(d.value)) } )
	            .attr("fill", "#1f77b4" )
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

		// Make tittle
		chartSub.append("text")
			.attr("x", (widthSub / 2))
			.attr("y", 10 - (marginSub.top / 2))
			.attr("font-family", "sans-serif")
			.attr("text-anchor", "middle")
			.style("font-size", "20px")
			.text(categoryText + categoryYear);

}
