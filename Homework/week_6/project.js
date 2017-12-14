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
	 https://bl.ocks.org/sarubenfeld/56dc691df199b4055d90e66b9d5fc0d2
*/

var colour = d3.scaleOrdinal(d3.schemeCategory10);

queue()
	.defer(d3.csv, 'totaal.csv')
	.defer(d3.csv, 'groep.csv')
	.await(pipeline)

function pipeline(error, dataTotaal, dataGroep){
	makeGroupBarchart(dataTotaal, dataGroep)
}
