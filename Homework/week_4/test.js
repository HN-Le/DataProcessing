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
    var colours = ['#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#005824’'];

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

});
