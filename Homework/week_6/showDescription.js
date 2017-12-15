/*
	Dataprocessing
	Tiny Le
	11130717

	Week 6: Linked Views
	Creating a linked views visualization

	Aim is to make a general group barchart about the data and when clicked on a bar, that specific group will be viewed
	in the bar chart below for that year.

	Function to hide/show text when clicked on button

*/

function showDescription(){

	if (d3.select("#info").style("display") == "none" ){
		d3.select("#info").style("display", "block")
	}
	else{
		d3.select("#info").style("display", "none")
	}

}
