queue()
	.defer(d3.csv, 'totaal.csv')
	.defer(d3.csv, 'groep.csv')
	.await(makeBarchart);

function makeBarchart(error, dataTotaal){

    var svg = d3.select("svg"),
        margin = {top: 100, right: 300, bottom: 100, left: 100},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Distance between groups of bars
    var x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.01);

    // Distance between bars
    var x1 = d3.scaleBand()
        .padding(0.2);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal(d3.schemeCategory10);

    var div = d3.select("body").append("div")
    .attr("class", "tooldiv")
    .style("opacity", 0);

    dataTotaal.forEach(function(d) {
        d["Toegang tot internet"] = +d["Toegang tot internet"];
        d["Personal Computer (PC) of desktop"] = +d["Personal Computer (PC) of desktop"];
        d["Laptop of netbook"] = +d["Laptop of netbook"];
        d["Tablet"] = +d["Tablet"];
        d["Mobiele telefoon of smartphone"] = +d["Mobiele telefoon of smartphone"];
        });

        var keys = dataTotaal.columns.slice(1);
        var keys2 = dataTotaal.columns.slice(2);


        x0.domain(dataTotaal.map(function(d) { return d.Perioden; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, 100]);

        g.append("g")
          .selectAll("g")
          .data(dataTotaal)
          .enter().append("g")
            .attr("transform", function(d) { return "translate(" + x0(d.Perioden) + ",0)"; })
          .selectAll("rect")
          .data(function(d) { return keys2.map(function(key) { return {key: key, value: d[key]}; }); })
          .enter().append("rect")
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return z(d.key); })
            .attr("dy", function(d) { return d.value; })
            .on("mouseover", function(d) {

               div.transition()
                .style("opacity", .9);
               div.html(d.key + "<br/>" + d.value + "<span>" + "%" + "</span>")
                 .style("left", (d3.event.pageX) + "px")
                 .style("top", (d3.event.pageY) + "px");
               })
             .on("mouseout", function(d) {
               div.transition()
               .style("opacity", 0);
               });

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("% van de bevolking heeft ");

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys2.slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width + margin.right - 80)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width + margin.right - 100)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });

        // Make tittle
        g.append("text")
            .attr("x", (width / 2))
            .attr("y", 10 - (margin.top / 2))
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .text("Internet faciliteiten in Nederlandse huishoudens");

}
