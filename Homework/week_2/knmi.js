<<<<<<< HEAD


// Put text into a variable
var data = document.getElementById("rawdata").value;

// Split data by line
var data2 = data.split('\n');
console.log(data2)

// Make empty arrays to store date and temp
var date = [];
var maxTemp = [];
console.log(date)

// Split data into date and max temperature
for (var i = 2; i < data2.length; i++) {
    var singleDate = data2[i].split(",");
    date.push(singleDate[0]);
    maxTemp.push(singleDate[1]);
}

console.log("date", date);
console.log("maxTemp", maxTemp);
=======


// Put text into a variable
var data = document.getElementById("rawdata").value;

// Split data by line
var data2 = data.split('\n');
console.log(data2)

// Make empty arrays to store date and temp
var date = [];
var maxTemp = [];
console.log(date)

// Split data into date and max temperature
for (var i = 2; i < data2.length; i++) {
    var singleDate = data2[i].split(",");
    date.push(singleDate[0]);
    maxTemp.push(singleDate[1]);
}

console.log("date", date);
console.log("maxTemp", maxTemp);
>>>>>>> 7842b5bd17da6bd40390050b986bccdb2ec2b767
