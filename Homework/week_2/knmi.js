// Put text into a variable
var data = document.getElementById("rawdata").value;

// Split data by line
var data2 = data.split('\n');
//console.log("Data per line, ", data2)

// Make empty arrays to store date and temp
var date = [];
var maxTemp = [];

// Split data into date and max temperature
for (var i = 2; i < data2.length; i++) {
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
    maxTemp.push(singleDate[1]);
}

console.log("date", date);
console.log("maxTemp", maxTemp);

canvas();

var domain = [];
var range = [];

function canvas(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.moveTo(0,0);
    ctx.lineTo(600,300);
    ctx.stroke();
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
