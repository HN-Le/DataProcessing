var text;
reqListener();
loadFile();

console.log(text);

// Put text into a variable
var data = document.getElementById("rawdata").value;

// Split data by line
var data2 = data.split('\n');
//console.log("Data per line, ", data2)

// Make empty arrays to store date and temp
var date = [];
var temperature = [];

// Split data into date and max temperature
for (var i = 2; i < data2.length - 1; i++) {
    var singleDate = data2[i].split(",");

    // console.log(singleDate[0]);

    // Formate dates
    var year = singleDate[0].slice(0,4);
    var month = singleDate[0].slice(4,6);
    var day = singleDate[0].slice(6,8);

    // console.log("Year", year);
    // console.log("Month", month);
    // console.log("Day", day);

    var formattedDate = year + '-' + month + '-' + day;
    // console.log("String Date", formattedDate);

    date.push(new Date(formattedDate));
    temperature.push(Number(singleDate[1]));
}

console.log("Date ", date);
console.log("Temperature ", temperature);

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

// var domainTemp = [minTemp, maxTemp];
var domainTemp = [maxTemp, minTemp];
console.log("DomainTemp", domainTemp);


console.log("min: " + minTemp + " max: " + maxTemp);

var space = 90;
// To move the axe away from the edge
var whiteSpace = 40;

var test = (40+ 1460)/13;

var rangeX = [test, 1500];
var rangeY = [190, 820];

console.log("DomainTemp: ", domainTemp);
console.log("rangeY: ", rangeY);

for(var i = 0; i < temperature.length; i++){

    var singleTempPoint = (createTransform(domainTemp, rangeY)(temperature[i]));
    // console.log("Point: ", point);
    yCoordinate.push(singleTempPoint);
}

console.log("yCoordinate: ", yCoordinate);
console.log("length: ", yCoordinate.length);

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


console.log("Days: ", dateDays);

var domainDate = [dateDays[0], dateDays[364]];
for(var i = 0; i < dateDays.length; i++){

    var singleDatePoint = (createTransform(domainDate, rangeX)(dateDays[i]));
    xCoordinate.push(singleDatePoint);
}

console.log("xCoordinate: ", xCoordinate);

Array.min = function( xCoordinate ){
    return Math.min.apply( Math, xCoordinate );
};

Array.max = function( xCoordinate ){
    return Math.max.apply( Math, xCoordinate );
};

var minCor = Array.min(xCoordinate);
var maxCor = Array.max(xCoordinate);

console.log("MIN: " + minCor + " MAX " + maxCor);

var canvas = document.getElementById("canvas");
var graph = canvas.getContext("2d");
var sectionDate;

drawAxes();

draw();

// for (i = 0; i < 364; i++){
//     console.log("xCoordinate: " + xCoordinate[i] + " yCoordinate: " + yCoordinate[i]);
// }

function draw(){

    for(i = 0; i < date.length; i++){

        graph.beginPath();
        graph.moveTo(xCoordinate[i], yCoordinate[i]);
        graph.lineTo(xCoordinate[i+1], yCoordinate[i+1]);

        graph.lineWidth = 2;

        graph.stroke();
        graph.strokeStyle="#ff6666";

        // console.log("MOVE TO) Coordinaten X: " + start + " Coordinaten Y: " + prev_point);
        // console.log('\n');
        // console.log("LINE TO) Coordinaten X: " + start + " Coordinaten Y: " + prev_point);
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

function loadFile() {

var xmlhttp;
var text;
xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = xmlhttp.responseText; ;
    }
  };
  xmlhttp.open("GET", "knmi.txt", true);
  xmlhttp.send();
}

function drawAxes(){

    var canvasWidth = 1600;
    var canvasHeight = 860;

    // 900 - 90 = 810
    // 1500 - 40 = 1460
    // 1460 / 12

    var sectionDate = (40+ 1460)/13;

    // // Horizontal Axe
    // graph.beginPath();
    // graph.moveTo(whiteSpace, (canvasHeight - space));
    // graph.lineTo(1500, (canvasHeight - space));
    // graph.stroke();
    //
    graph.fillText('TEST', 50, 860);
    graph.fillText('TEST', sectionDate, 860);
    graph.fillText('HOOGTE', 300, 40);
    graph.fillText('HOOGTE', 300, 860);

    // Labels

    // Vertical Axe
    graph.beginPath();

    // xAxis = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""];
    xAxis = ["Nov (2016)", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov(2017)"];

    // 40
    // 900 - 40 = 860
    // 860 - 40 = 820
    // 930 - 40 40 30
    // 930 - 110 = 820 /

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

    // var yAxis = ["", "-50", "0", "50", "100", "150", "200", "250", "300", "350"];
    var yAxis = ["250", "200", "150", "100", "50", "0", "-50"];

    // 900 - 90
    // Horizontal
    // 70
    // 860, 790
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
