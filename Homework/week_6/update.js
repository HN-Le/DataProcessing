/*
	Dataprocessing
	Tiny Le
	11130717

	Week 6: Linked Views
	Creating a linked views visualization

	Aim is to make a general group barchart about the data and when clicked on a bar, that specific group will be viewed
	in the bar chart below for that year.

	Function to update graphs when clicked on one of the bars in the groupbar chart

*/

function update(data, category, groupID, categoryText, categoryYear){


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

	newBars.data(data[category])
			.enter().append("rect")
			.attr("class", "bar")
			.attr("id", "singleBar")
			.attr("x", function(d) { return xBarchart(d.key); } )
			.attr("width", xBarchart.bandwidth() )
			.attr("y", function(d) { return yBarchart(d.value) } )
			.attr("height", function(d) { return (heightSub - yBarchart(d.value)) } )
			.attr("fill", function(d) { return groupID } )
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

		d3.select("#catergoryText").remove()
		d3.select("#catergoryYear").remove()

		// Make tittle
		chartSub.append("text")
			.attr("x", (widthSub / 2))
			.attr("y", 10 - (marginSub.top / 2))
			.attr("id", "catergoryText")
			.attr("font-family", "sans-serif")
			.attr("text-anchor", "middle")
			.style("font-size", "20px")
			.text(categoryText[categoryID]);

			// Make tittle
			chartSub.append("text")
				.attr("x", (widthSub / 2))
				.attr("y", -15)
				.attr("id", "catergoryYear")
				.attr("font-family", "sans-serif")
				.attr("text-anchor", "middle")
				.style("font-size", "20px")
				.text(categoryYear[yearID]);
}
