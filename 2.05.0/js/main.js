/**
 * Author: Siqi Zhao
 * Created by 2018-05-19
 * */

d3.json("data/data.json").then(function(data) {
    console.log(data.nodes);

    var jsonCirclePositions = data.nodes;  // Extract the positions of the circles...
    var jsonCircleLinks = data.links;  // Extract links between nodes...

    var val_max_x = d3.max(data.nodes, function(d) {return d.x;});  // Find the highest value of axis_x...
    var val_max_y = d3.max(data.nodes, function(d) {return d.y;});  // Find the highest value of axis_y...


    // Define the div for the tooltip
    var div = d3.select("#chart-area").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", val_max_x + 200)
        .attr("height", val_max_y + 200);

    var circles = svg.selectAll("circle")
        .data(jsonCirclePositions);

    circles.enter()  // Setup the circles...
        .append("circle")
        .attr("cx", function (d) {
            return d.x
        })
        .attr("cy", function (d) {
            return d.y
        })
        .attr("r", 5)
        .attr("fill", "red")
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d.id)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })

}).catch(function (error) {
    console.log(error)
});







