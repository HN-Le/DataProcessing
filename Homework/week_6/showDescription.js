function showDescription(){

	if (d3.select("#info").style("display") == "none" ){
		d3.select("#info").style("display", "block")
	}
	else{
		d3.select("#info").style("display", "none")
	}

}
