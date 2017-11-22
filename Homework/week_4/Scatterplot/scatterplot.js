/*
Dataprocessing
Week 4: Scatterplot

Tiny Le
11130717
*/

/* COMMENTS */


// Clickable link to source dataset
d3.select("body").append("p").html("First lines").attr("id", "source");
d3.select("#source")
.html('<a href = "http://happyplanetindex.org/countries">'
        + "Source: New Economics Foundation</a>");

// Only make scatterplot when data is loaded
ifLoaded(drawChart)

// Callback for when data is loaded
function ifLoaded(callback){
    d3.json("data.json", function (data){
        //
        if (!data){
            console.log("ERROR, could not load data")
        }
        else{
            callback(data);
        }
    });
}

function drawChart(data){
    console.log("Werkt")


}
