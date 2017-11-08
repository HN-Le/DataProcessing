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

function canvas(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.moveTo(0,0);
    ctx.lineTo(600,300);
    ctx.stroke();
}

//sdfkjsakdjfa;lksdjf;alksd;jf;klsdjfkljwe
