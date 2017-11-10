/*
    DataProcessing
    Tiny Le
    11130717
    Week 2

Grafiek maken met een dataset van een externe text file.

    - Opdracht is een beetje (nogal) een zooitje
    - Zonder inladen werkte, daarna ging het snel bergafwaards

    Door tijdgebrek:
    - Heel veel slecht quickfixes
    - Mist vragen
    - Mist goede comments
    - Mist bronnen
    - Een niet werkend script

Volgende opdracht zal (stukken) beter geschreven zijn

*/

// Make empty arrays to store date and temp
var date = [];
var temperature = [];

// Canvas to draw the graoh
var canvas = document.getElementById("canvas");
var graph = canvas.getContext("2d");

// The sizes for the grids in the graph
var sectionDate;
var sectionTemp;

// To move the axe away from the edge
var space = 90;
var whiteSpace = 40;

loadFile();

function draw(){

    // Draw the datapoints
    for(i = 0; i < date.length; i++){

        graph.beginPath();
        graph.moveTo(xCoordinate[i], yCoordinate[i]);
        graph.lineTo(xCoordinate[i+1], yCoordinate[i+1]);

        graph.lineWidth = 2;

        graph.stroke();
        graph.strokeStyle="#ff6666";
    }

}

function createTransform(domain, range){
	// domain is a two-element array of the data bounds [domain_min, domain_max]
	// range is a two-element array of the screen bounds [range_min, range_max]
	// this gives you two equations to solve:
	// range_min = alpha * domain_min + beta
	// range_max = alpha * domain_max + beta
 	// a solution would be:

    var domain_min = domain[0]
    var domain_max = domain[1]
    var range_min = range[0]
    var range_max = range[1]

    // formulas to calculate the alpha and the beta
   	var alpha = (range_max - range_min) / (domain_max - domain_min)
    var beta = range_max - alpha * domain_max

    // returns the function for the linear transformation (y= a * x + b)
    return function(x){
      return alpha * x + beta;
    }
}

function drawAxes(){

    var canvasWidth = 1600;
    var canvasHeight = 860;

    // Labels
    // Vertical Axe
    graph.beginPath();
    xAxis = ["Nov (2016)", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov(2017)"];

    for (i = 1; i < 14; i++){
        graph.moveTo((i * sectionDate), whiteSpace);
        graph.lineTo((i * sectionDate), (canvasHeight - whiteSpace));
        graph.stroke();
        graph.fillText(xAxis[i-1], (i * sectionDate), 840);

        // Make only the first line black
        if(i == 1){
            graph.beginPath();
            graph.strokeStyle="#000000";
        }
        else{
            graph.strokeStyle="#d3d3d3";
        }
    }

    var sectionTemp = 820/7;
    graph.beginPath();

    var yAxis = ["250", "200", "150", "100", "50", "0", "-50"];

    for (i = 0; i < 8; i++){
        graph.moveTo(whiteSpace, (canvasHeight - (sectionTemp * i)));
        graph.lineTo(1500, (canvasHeight - (sectionTemp * i)));
        graph.stroke();
        graph.fillText(yAxis[i-1], space, (i * sectionTemp + whiteSpace ));

        if(i == 0){
            graph.beginPath();
            graph.strokeStyle="#000000";
        }
        else {
            graph.beginPath();
            graph.strokeStyle="#d3d3d3";
        }
    }
}

function loadFile() {

var xmlhttp;
var text;
xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      text = xmlhttp.responseText;

      // Split data by line
      var data = text.split('\n');

      // Split data into date and max temperature
      for (var i = 2; i < data.length - 1; i++) {
          var singleDate = data[i].split(",");

          // Formate dates
          var year = singleDate[0].slice(0,4);
          var month = singleDate[0].slice(4,6);
          var day = singleDate[0].slice(6,8);

          var formattedDate = year + '-' + month + '-' + day;

          // Put it in the arrays
          date.push(new Date(formattedDate));
          temperature.push(Number(singleDate[1]));
      }

      var xCoordinate = [];
      var yCoordinate = [];

      // Source: https://johnresig.com/blog/fast-javascript-maxmin/
      Array.min = function( temperature ){
          return Math.min.apply( Math, temperature );
      };

      Array.max = function( temperature ){
          return Math.max.apply( Math, temperature );
      };

      var minTemp = Array.min(temperature);
      var maxTemp = Array.max(temperature);

      // Quickfixe, should be the reverse but made a mistake somewhere..
      var domainTemp = [maxTemp, minTemp];

      var sectionDate = (40+ 1460)/13;

      var rangeX = [sectionDate, 1500];
      var rangeY = [190, 820];

      for(var i = 0; i < temperature.length; i++){

          var singleTempPoint = (createTransform(domainTemp, rangeY)(temperature[i]));
          yCoordinate.push(singleTempPoint);
      }

      var dateDays = [];
      var daysSinceJanuary = [];

      for (i = 0; i < date.length; i++){
          var dataDate = new Date(date[i]);
          var dataInMilliSeconds = Number(dataDate.getTime(date[i]));
          var dataIndays = (dataInMilliSeconds / 86400000);
          daysSinceJanuary.push(dataIndays);
          var axeDate = (dataIndays - daysSinceJanuary[0]);
          dateDays.push(axeDate);
      }

      var domainDate = [dateDays[0], dateDays[364]];
      for(var i = 0; i < dateDays.length; i++){

          var singleDatePoint = (createTransform(domainDate, rangeX)(dateDays[i]));
          xCoordinate.push(singleDatePoint);
      }

      Array.min = function( xCoordinate ){
          return Math.min.apply( Math, xCoordinate );
      };

      Array.max = function( xCoordinate ){
          return Math.max.apply( Math, xCoordinate );
      };

      var minCor = Array.min(xCoordinate);
      var maxCor = Array.max(xCoordinate);

    }
  };

  xmlhttp.open("GET", "https://raw.githubusercontent.com/HN-Le/DataProcessing/master/Homework/week_2/knmi.txt", true);
  xmlhttp.send();

  drawAxes();

  draw();



}
