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

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", val_max_x + 200)
        .attr("height", val_max_y + 200);

    var circles = svg.selectAll("circle")
        .data(jsonCirclePositions);

    circles.enter()
        .append("circle")
        .attr("cx", function (d) {
            return d.x
        })
        .attr("cy", function (d) {
            return d.y
        })
        .attr("r", 5)
        .attr("fill", "red");

}).catch(function (error) {
    console.log(error)
});







