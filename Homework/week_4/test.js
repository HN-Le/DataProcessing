/*
Data Processing
Week 4: D3 Scatterplot

Tiny Le
11130717

Sources:


*/

/*
    D:\Code\GitHub\DataProcessing\Homework\week_4
    python -m SimpleHTTPServer 8888 &
*/
d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;
    document.body.appendChild(xml.documentElement);

    //code om te veranderen
    var colours = ['#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#005824'];
    var numbers = ['100', '1000', '10000', '100000', '1000000', '10000000'];

    var widthKleur = 21
    var height = 29
    var xKleur = 13
    var y = 138.7
    var interval = 42

    var widthTekst = 119.1
    var xTekst = 46.5

    d3.select("svg").append("rect")
        .attr("id", "kleur4")
        .attr("class", "st1")
        .attr("x", xKleur)
        .attr("y", y)
        .attr("width", widthKleur)
        .attr("height", height)

    d3.select("svg").append("rect")
        .attr("id", "kleur5")
        .attr("class", "st1")
        .attr("x", xKleur)
        .attr("y", (y + interval))
        .attr("width", widthKleur)
        .attr("height", height)

    d3.select("svg").append("rect")
        .attr("id", "kleur6")
        .attr("class", "st1")
        .attr("x", xKleur)
        .attr("y", (y + 2 * interval))
        .attr("width", widthKleur)
        .attr("height", height)


    d3.select("svg").append("rect")
        .attr("id", "tekst5")
        .attr("class", "st2")
        .attr("x", xTekst)
        .attr("y", (y + interval))
        .attr("width", widthTekst)
        .attr("height", height)

    d3.select("svg").append("rect")
        .attr("id", "tekst6")
        .attr("class", "st2")
        .attr("x", xTekst)
        .attr("y", (y + 2*interval))
        .attr("width", widthTekst)
        .attr("height", height)

    d3.selectAll(".st1")
        .style("fill", function (d, i) {return colours[i];})

    for (i = 1; i < numbers.length +1 ; i++){

        d3.select("svg")
        .append("text")
        .text(function (d) {return numbers[i - 1];})

        .attr("x", 50)
        .attr("y", (40 *i))
        .attr("width", widthTekst)
        .attr("height", height)

        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", colours[i -1])
    }




});
